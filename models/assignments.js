const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var assignments= mongoose.Schema({
    assignmentid:{type: String, required: true},
    username:{type: Schema.Types.ObjectId, ref: 'user' ,required: true},
    taskid:{type: Schema.Types.ObjectId, ref: 'taskdetails' ,required: true},
    taskstatus:{type: Schema.Types.ObjectId, ref: 'taskstatus' ,required: true},
    assignmentdate:{type: String, required: true},
    finishdate:{type: String, required: false},
    temp1:{type: String, required: false},
    temp2:{type: String, required: false},
    temp3:{type: String, required: false}
    
  
});

module.exports=mongoose.model("assignments",assignments);

// type: Schema.Types.ObjectId, ref: 'Ingredient