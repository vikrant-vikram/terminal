const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user= mongoose.Schema({

    username:{type: String, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true},
    contact:{type: String, required: true},
    joining_date:{type: String, required: true},
    status:{type: Schema.Types.ObjectId, ref: 'userstatus' ,required: true},
    instagram:{type: String, required: true},
    twitter:{type: String, required: true},
    youtube:{type: String, required: true},
    adds:{type: String, required: true},
    level:{type: String, required: true},
    pan:{type: String, required: true},
    temp1:{type: String, required: false},
    temp2:{type: String, required: false}
});

module.exports=mongoose.model("users",user);

