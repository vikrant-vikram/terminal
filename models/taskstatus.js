const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskstatus= mongoose.Schema({
    taskstatus:{type: String, required: true},
    meaning:{type: String, required: true} 
});

module.exports=mongoose.model("taskstatus",taskstatus);

