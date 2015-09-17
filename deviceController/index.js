var DAO = require('../houseDAO');

var allDevices = require("../devices");
var functions = {};
var somerooms = [
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
var hasBeenInRoom = [];

functions.addToHasBeenInRoom = function(aRoom){
        if(hasBeenInRoom.length === 15){
            hasBeenInRoom.shift();
        }
        hasBeenInRoom.push(aRoom);
    };


functions.turnOffUnusedRooms = function(){

        somerooms.forEach(function(room){
            console.log("testing : "+ room);
            console.log("rooms number in array: " + hasBeenInRoom.indexOf(room));

            if(hasBeenInRoom.indexOf(room) === -1) {
                DAO.turnDevicesOff(room);
                console.log("turned off " + room);


            }
        });

    };


functions.printLastRooms = function(){
    console.log("Listed Rooms:");
    hasBeenInRoom.forEach(function(thisRoom){
        console.log(thisRoom);


    });
    console.log("__________");
}
functions.getArraySize = function(){
    console.log("array length:" +  hasBeenInRoom.length);
    return hasBeenInRoom.length;

};
module.exports = functions;

