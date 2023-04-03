const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resources= mongoose.Schema({
    resourceid:{type: String, required: true},
    taskid:{type: Schema.Types.ObjectId, ref: 'taskdetails' ,required: true},
    resource:{type: String, required: true},
    description:{type: String, required: true},
    type:{type: Schema.Types.ObjectId, ref: 'resourcetype' ,required: true}
  
});

module.exports=mongoose.model("resources",resources);

