const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resourcetype= mongoose.Schema({
    type:{type: String, required: true},
    meaning:{type: String, required: true}
});

module.exports=mongoose.model("resourcetype",resourcetype);

