//require model
var garage = require("./garage");

function Coordinate(lat, long){

    this.latitude = lat;
    this.longitude = long;

};

Coordinate.prototype.toString = function(){
    return "house latitude: " + this.latitude + "\nhouse longitude: "+ this.longitude;
};



var coordinateOperation = function (coord0, coord1) {
//uses Haversine formula to produce the distance
    var distanceLatitude = (coord0.latitude - coord1.latitude) * Math.PI / 180;
    var distanceLongitude = (coord0.longitude - coord1.longitude) * Math.PI / 180;
    var radius = 6378.137;
    var average = Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
        Math.cos(coord0.latitude * Math.PI / 180) * Math.cos(coord1.latitude * Math.PI / 180) *
        Math.sin(distanceLongitude / 2) * Math.sin(distanceLongitude / 2);
    var cartesian = 2 * Math.atan2(Math.sqrt(average), Math.sqrt((1 - average)));
    var distance = radius * cartesian;
    return distance * 1000;
//meters
};

var tester = function (dist){
    var inRange = 10;
    if (dist <= inRange){
        console.log("Welcome home jason");
        openDoor();
    }else{
        console.log("user not in distance")
    }
};

var openDoor = function(){
    garage.setDoorState(1);

};

var closeDoor = function(){
   garage.setDoorState(0);
};

//var buildDisplay = function(distance){
//    var divvy = document.getElementById("div");
//    var table = document.createElement("table");
//    var headdy = document.createElement("th")
//    headdy.innerHTML = "<h1>Garage Data</h1>"
//    var distanceRow = document.createElement("tr");
//    var distanceTitle = document.createElement('td');
//    distanceTitle.innerHTML = "<p>Distance</p>";
//    var distanceContent = document.createElement('td');
//    distanceContent.innerHTML = "<p>" + distance +"</p>";
//    var doorStatusRow = document.createElement('tr');
//    var doorStatusTitle = document.createElement('td');
//    doorStatusTitle.innerHTML = "<p>Door Status</p>";
//    var doorStatusContent = document.createElement('td')
//    doorStatusContent.innerHTML = garage.doorState;
//
//    divvy.appendChild(table);
//    table.appendChild(headdy);
//    distanceRow.appendChild(distanceTitle);
//    distanceRow.appendChild(distanceContent);
//    table.appendChild(distanceRow);
//    doorStatusRow.appendChild(doorStatusTitle);
//    doorStatusRow.appendChild(doorStatusContent);
//    table.appendChild(doorStatusRow);
//
//}

var houseCoord = new Coordinate(garage.getLat(), garage.getLong());
console.log(houseCoord);
console.log(houseCoord.latitude + "wsaeda " + houseCoord.longitude);

console.log(houseCoord.toString());

var myCoord = new Coordinate(-16.778869, 145.684453);
var  mydist = coordinateOperation(myCoord, houseCoord);

console.log("Distance: " + mydist);
console.log("State: " + garage.getDoorState());
tester(mydist);
var currentDoorState = garage.getDoorState();

things = {
    dist: mydist,
    state: currentDoorState
};


module.exports = things;



//console.log("running");
//console.log("garage lat: " + garage.latitude);
//console.log("garage long: " + garage.longitude);
