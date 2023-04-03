const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskdetails = mongoose.Schema({
    taskid:{type: String, required: true},
    taskStory:{type: String, required: true},
    creationdate:{type: String, required: true},
    targetdate:{type: String, required: true},
    type:{type: Schema.Types.ObjectId, ref: 'tasktype' ,required: true},
    poits:{type: String, required: true}

});

module.exports=mongoose.model("taskdetails",taskdetails);

