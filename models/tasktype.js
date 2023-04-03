
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tasktype= mongoose.Schema({
    type:{type: String, required: true},
    meaning:{type: String, required: true}
});

module.exports=mongoose.model("tasktype",tasktype);

