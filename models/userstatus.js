const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userstatus= mongoose.Schema({
    status:{type: String, required: true},
    meaning:{type: String, required: true}
});

module.exports=mongoose.model("userstatus",userstatus);

