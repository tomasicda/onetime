/**
 * Created by Adam on 9/09/2015.
 */
var personSimulator = require('../personSimulator');
var deviceController = require('../deviceController');
var DAO = require('../houseDAO');
//var lastTime = null;
//var thisTime = null;
var daroom;
var rooms = [
    "garage",
    "dining",
    "bathroom",
    "balcony",
    "garden",
    "living",
    "bedroom01",
    "bedroom02",
    "bedroom03",
    "bedroom04"
];
var inroom = {
    "garage":null,
    "dining": null,
    "bathroom": null,
    "balcony": null,
    "garden": null,
    "living": null,
    "bedroom01": null,
    "bedroom02": null,
    "bedroom03": null,
    "bedroom04": null
};
var count = 0;

var testInRoom = function(aRoom, location){
    //get current room from state machine
    if (location === aRoom) {
        inroom[aRoom] = true;
        daroom = location.toString();
        deviceController.addToHasBeenInRoom(daroom);
        deviceController.printLastRooms();

    }else{
        inroom[aRoom]= false;
    }

    return daroom;
};

var reups = function(){
    var inRoom;
    setTimeout(function (err) {
        if(err){
            console.log(err);
        }
        var location = personSimulator();
        count++;
        console.log("COUNTER: " + count);
        rooms.forEach(function(room){

           inRoom = testInRoom(room, location);

       });

        if(deviceController.getArraySize() >= 15) {
            deviceController.turnOffUnusedRooms();
        }


        reups();
    }, 6000);


};

//should this be not in a module and set to start rnning in dependencies 'start' thing?
module.exports = reups;