var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var socket = io.connect("http://localhost:3000");

var myStateText;
socket.on('nowBuilding', function(builder) {
    console.log("IN NOW BUILDING");
    Object.keys(builder.myDevices).forEach(function (device) {
        console.log("In Building Client Model Device: " + device );
        console.log(" Device State: " + builder.myDevices[device].state);
        allDevices[device] = builder.myDevices[device];
        console.log(allDevices[device]);
    });
});


socket.on('connect', function(){
    console.log("connected to client");

});

var setRoom = function(aroom){


    var display = document.getElementById('roomView');
    var myList = document.createElement('ul');
    var myItem;


    aroom["things"].forEach(function(device){
         myItem = document.createElement('li');
        var myButton = document.createElement('input');
        console.log("RAARARARA: " + allDevices[device].state);
        myStateText = document.createTextNode(allDevices[device].state);


        //myItem.setAttribute('style', 'background-color: yellow; padding: 10px; width: 250px; text-decoration: none');
        myItem.setAttribute('class', 'myButton');
        myButton.setAttribute('type', 'button');

        //	var myText = document.createTextNode(aroom["things"][item]);
        myButton.setAttribute('name', device);
        myButton.setAttribute('value', device);

        (function(myButton){
            socket.on("stateChanged",function(stateChanged){
            if(myButton.name === stateChanged.nameValue) {
                console.log("cherrr" + stateChanged.stateValue);
                allDevices[stateChanged.nameValue] = stateChanged.stateValue;
                console.log("Name" + stateChanged.nameValue + "buttons value: " + stateChanged.stateValue);
                myButton.parentNode.lastChild.nodeValue = allDevices[stateChanged.nameValue];
            }
        });
        }(myButton));
        //	myButton.appendChild(myText);
        myButton.addEventListener('click', function(event){

            var buttonPressed = {myName: myButton.name};

            socket.emit("buttonPressed", buttonPressed);




            console.log("pressed button");
            //if(myStateText.textContent === "OFF"){//	myStateText.textContent = "ON";
            //}else{
            //	myStateText.textContent = "OFF";
            //}
        });


        myItem.appendChild(myButton);
        myItem.appendChild(myStateText);
        myList.appendChild(myItem);

    });

    display.appendChild(myList);

};


var removeRoom = function(){
    var display = document.getElementById('roomView');
    while(nextChild = display.firstChild){
        display.removeChild(nextChild);
    }

};

var replaceListeners = function(aroom){
    for(var room in rooms){
        if(aroom.name !== room){
            canvas.addEventListener('click', rooms[room]["listener"]);
        }
    }
};


var freezeOtherRooms = function(aroom){
    for(var room in rooms){
        console.log(room);
        console.log(aroom.name);
        if(aroom.name !== room){
            canvas.removeEventListener('click', rooms[room]["listener"]);
        }
    }
};


var buildRoom = function(aroom){
    aroom["path"].moveTo(aroom["points"][0][0],aroom["points"][0][1]);
    for( var i = 0; i < aroom["points"].length; i++){
        aroom["path"].lineTo(aroom["points"][i][0] , aroom["points"][i][1]);
    }
    addListener(aroom);
    context.stroke(aroom["path"]);
    context.fillStyle = 'rgba(12,174,0,0)';
    context.fill(aroom["path"]);


    canvas.addEventListener('click', aroom["listener"]);
};

var addListener = function(aroom){
    aroom["listener"] = function(event){
        console.log("in listener");
        if(!aroom["on"]){
            var x =  event.x;
            var y = event.y;
            if(context.isPointInPath(aroom["path"], x, y)){
                context.fillStyle = 'rgba(12,34,54,.3)';
                context.fill(aroom["path"]);
                console.log("room things: " + aroom.things);
                //var myObj = {"roomId": aroom.name, "deviceArray": aroom.things };
                //socket.emit("roomSelected", myObj);

                freezeOtherRooms(aroom);


                setRoom(aroom);
                aroom["on"] = true;

            }
        }else{
            context.clearRect(0,0,900,600);
            removeRoom();
            replaceListeners(aroom);


            context.fillStyle = 'rgba(12, 174, 0,0)';
            context.stroke(aroom["path"]);
            context.fill(aroom["path"]);
            aroom["on"] = false;

        }
    };
};

var displayRooms = function(){
    buildRoom(rooms["garage"]);
    buildRoom(rooms["dining"]);
    buildRoom(rooms["bathroom"]);
    buildRoom(rooms["balcony"]);
    buildRoom(rooms["garden"]);
    buildRoom(rooms["bedroom01"]);
    buildRoom(rooms["bedroom02"]);
    buildRoom(rooms["living"]);
    buildRoom(rooms["bedroom03"]);
    buildRoom(rooms["bedroom04"]);
};