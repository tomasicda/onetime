
var mongoose = require('mongoose');
var fs = require('fs');
var path  = require('path');
mongoose.connect("mongodb://localhost/homeautos");


fs.readdirSync(__dirname + "/../../../mongodb/").forEach(function(filename){
    if(~filename.indexOf('.js')) require(__dirname + "/../../../mongodb/" + filename);
});

daoFunctions = {};

daoFunctions.asyncToggleState = function(device, callback){
    //do set state for device in db

    var doc = mongoose.model("Device").findOne({deviceName: device}, function (err, doc) {
        if (err) {
            console.log(err);
        }
        if(!doc){
            console.log("doc is null");
        }
        if (doc["deviceState"] === "OFF") {
            doc["deviceState"] = "ON";

        } else {
            doc["deviceState"] = "OFF";

        }
        mongoose.model("Device").update({deviceName: device},{$set: { deviceState: doc.deviceState}}, {multi:false}, function(err, numAffected){
            console.log("affected: "+ numAffected.toString());
        });
        console.log("state: " + doc.deviceState);
        //pass the parameter to the callback after its new value assigned
        callback(doc.deviceState);
    });

};

daoFunctions.getState = function(device, callback){
    //do get state for device in db
    console.log("DEVICENAME: " + device);
    var doc = mongoose.model("Device").findOne({deviceName: device}, function (err, doc) {
        if(!doc){
            console.log("doc in nulls");
        }
        console.log("state in dao " + doc.deviceState);
        callback(doc.deviceState);
    });

};

daoFunctions.turnDevicesOff = function(aroom){
    var doc;
    doc = mongoose.model("Device").find({deviceRoom: aroom}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        if (!docs) {console.log("doc is null");
        }
        //console.log("My Docs" + docs.toString())
        docs.forEach(function (roomDoc){
            roomDoc.deviceState ="OFF";

            mongoose.model("Device").update({deviceName: roomDoc.deviceName},{$set: { deviceState: roomDoc.deviceState}}, {multi:false}, function(err, numAffected){
                console.log("affected: "+ numAffected);
            });
        });

    });
};
daoFunctions.asyncGetStates = function(devices) {
   // var roomDevices = {};
   devices.forEach(function (device) {
        var docs = mongoose.model("Device").find({deviceName: {$in: ["light01", "light02", "light03", "light04", "light05", "light06"]}}, function (err, doc) {
            if (err) {
                console.log(err);
            }
            if (!doc) {
                console.log("no Doc");
            }
            console.log("in the thing");

        });
    // callback(docs);
   });





};

module.exports = daoFunctions;

