
const cors = require("cors")
require("dotenv").config()
const path = require('path');
const express = require('express');
const app = express();

const Assignments = require("./models/assignments");
const Resources = require("./models/resources");
const ResourceType = require("./models/resourcetype");
const TaskDetails = require("./models/taskdetails");
const TaskStatus = require("./models/taskstatus");
const TaskType = require("./models/tasktype");
const User = require("./models/users");
const UserStatus = require("./models/userstatus");

var cookieParser = require('cookie-parser');
const body= require("body-parser");
let fs = require('fs');
const mongoose=require("mongoose");
const { response } = require("express");
const assignments = require("./models/assignments");
// const { $where } = require("./models/users");


const uuid = require("uuid");
const { stringify } = require("querystring");


app.use(cors({
    origin: '*'
}));

// setting us some local verialbles
const  PORT = process.env.PORT ;

const DBSERVER=process.env.MONGOOSE_DBSERVER;


mongoose.connect(DBSERVER, {useNewUrlParser: true,useUnifiedTopology: true}).then(data=>{
    console.log("connected");
}).catch(err=>{
    console.log(err);
});


// var session = require('express-session');



app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));
app.use(require("express-session")(
{
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});


// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new passportlocal(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use(body.json())

app.use(body.urlencoded({extended:true}));


//mongoose.connect("mongoosedb://localhost/defarm");















app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());








app.get('/', (req, res, next) => {
    res.render('home');
});



app.post('/contact', (req, res, next) => {
    res.status(200).send('GMIAL: bikrant.acc.edu@icloud.com Instagram: @bikrant-bikram');
});




  
app.post("/profile",isLoggedIn,function (req, res) {
    res.status(200).send("user :"+req.session.user.username + "You are Logged in with Email ID :"+ req.session.user.email);

});



app.post("/chat",isLoggedIn,function (req, res) {

    res.status(200).send("Website is currently in Development mode. New Features will be avialable Soon. We will let You know.");

});


app.post("/getassignment",isLoggedIn, async function (req, res) {
    console.log("assignment");
    await Assignments.findOne({username:req.session.user.username, taskstatus:2}).then(found=>{
        if(found)
        res.status(200).send(found);
        else{
            res.status(200).send("No assignment")
        }
    }).catch(err=>{
        res.status(200).send(err);
    });    
});


app.get('/assignment', (req, res, next) => {
    res.render('assignment');
});


app.post("/setassignment", async function (req, res) {
    if(false){
        res.status(400).send("FU")
    }
    else{
        const date = new Date()
        const assignment={
            assignmentid: uuid.v4(),
            username: mongoose.Types.ObjectId(req.body.username),
            taskid: mongoose.Types.ObjectId(req.body.taskid),
            taskstatus: mongoose.Types.ObjectId(req.body.taskstatus),
            assignmentdate: date.toString(),
            finishdate: req.body.finishdate,
            temp1: null,
            temp2: null,
            temp3: null
        }

        Assignments.create(assignment).then(assignment=>{
        

            console.log(assignment);
            res.status(200).send("Assignment Created Successfully.................");
            
        }).catch(err=>{
            console.log(err)
            res.status(400).send("Error")
        });
    }
});



app.post("/setresources",isLoggedIn, async function (req, res) {
    if(req.session.user.status != 4){
        res.status(400).send("FU")
    }
    else{

        const resources={
            resourceid:uuid(),
            taskid:req.body.taskid,
            resource:req.body.resource,
            description:req.body.description,
            type:req.body.type
        }

        Resources.create(resources).then(resources=>{
        

            console.log(resources);
            res.status(200).send("resources Created Successfully.................");
            
        }).catch(err=>{
            console.log(err)
            res.status(400).send("Error")
        });
    }
});



app.post("/getresources",isLoggedIn, async function (req, res) {

    await Resources.findOne({taskid:req.body.taskid}).then(resource=>{
        if(resource)
        res.status(200).send(resource);
        else{
            res.status(400).send("No resource........")
        }
    }).catch(err=>{
        res.status(400).send(err);
    });    
});



app.post("/setresourcetype",isLoggedIn, async function (req, res) {
    if(req.session.user.status != 4){
        res.status(400).send("FU")
    }
    else{
        const resourcesType={
            type:req.body.type,
            meaning:req.body.meaning
        }

        ResourceType.create(resourcesType).then(resourcesType=>{
        

            console.log(resourcesType);
            res.status(200).send("resourcesType Created Successfully.................");
            
        }).catch(err=>{
            console.log(err)
            res.status(400).send("Error")
        });
    }
});



app.post("/getresourcestype",isLoggedIn, async function (req, res) {

    await ResourceType.findOne({type:req.body.type}).then(resource=>{
        if(resourceType)
        res.status(200).send(resourceType);
        else{
            res.status(400).send("No resource........")
        }
    }).catch(err=>{
        res.status(400).send(err);
    });    
});




app.post("/settaskdetails",isLoggedIn, async function (req, res) {
    if(req.session.user.status != 4){
        res.status(400).send("FU")
    }
    else{
        const date = new Date()
        const taskDetails={
            taskid:uuid.v4(),
            taskStory:req.body.taskStory,
            creationdate:date.toString(),
            targetdate:req.body.targetdate,
            type:req.body.type,
            poits:req.body.poits
        }

        TaskDetails.create(taskDetails).then(taskDetails=>{
        

            console.log(taskDetails);
            res.status(200).send("resourcesType Created Successfully.................");
            
        }).catch(err=>{
            console.log(err)
            res.status(400).send("Error")
        });
    }
});


app.post("/gettaskdetails",isLoggedIn, async function (req, res) {
    console.log("task details " + req.body.taskid)
    await TaskDetails.findOne({taskid:req.body.taskid}).then(taskdetails=>{
        if(taskdetails)
        res.status(200).send(taskdetails);
        else{
            res.status(400).send("No resource........")
        }
    }).catch(err=>{
        res.status(400).send(err);
    });    
});







app.post("/settaskstatus",isLoggedIn, async function (req, res) {
    if(req.session.user.status != 4){
        res.status(400).send("FU")
    }
    else{
        const taskstatus={
            taskstatus:req.body.taskstatus,
            meaning:req.body.meaning
        }

        TaskStatus.create(taskstatus).then(taskstatus=>{
        

            console.log(taskstatus);
            res.status(200).send("resourcesType Created Successfully.................");
            
        }).catch(err=>{
            console.log(err)
            res.status(400).send("Error")
        });
    }
});



app.post("/gettaskstatus",isLoggedIn, async function (req, res) {

    await TaskStatus.findOne({taskstatus:req.body.taskstatus}).then(taskstatus=>{
        if(taskstatus)
        res.status(200).send(taskstatus);
        else{
            res.status(400).send("No taskstatus........")
        }
    }).catch(err=>{
        res.status(400).send(err);
    });    
});



app.post("/setuserstatus",isLoggedIn, async function (req, res) {
    if(req.session.user.status != 4){
        res.status(400).send("FU")
    }
    else{
        const userstatus={
            status:req.body.status,
            meaning:req.body.meaning
        }

        UserStatus.create(userstatus).then(userstatus=>{
        

            console.log(userstatus);
            res.status(200).send("resourcesType Created Successfully.................");
            
        }).catch(err=>{
            console.log(err)
            res.status(400).send("Error")
        });
    }
});



app.post("/getuserstatus",isLoggedIn, async function (req, res) {

    await UserStatus.findOne({status:req.body.status}).then(userstatus=>{
        if(userstatus)
        res.status(200).send(userstatus);
        else{
            res.status(400).send("No taskstatus........")
        }
    }).catch(err=>{
        res.status(400).send(err);
    });    
});













app.post("/settasktype",isLoggedIn, async function (req, res) {
    if(req.session.user.status != 4){
        res.status(400).send("FU")
    }
    else{
        const tasktype={
            type:req.body.type,
            meaning:req.body.meaning
        }

        TaskType.create(tasktype).then(tasktype=>{
        

            console.log(tasktype);
            res.status(200).send("resourcesType Created Successfully.................");
            
        }).catch(err=>{
            console.log(err)
            res.status(400).send("Error")
        });
    }
});



app.post("/gettastype",isLoggedIn, async function (req, res) {

    await TaskType.findOne({type:req.body.type}).then(tasktype=>{
        if(tasktype)
        res.status(200).send(tasktype);
        else{
            res.status(400).send("No resource........")
        }
    }).catch(err=>{
        res.status(400).send(err);
    });    
});

















app.post("/logout",isLoggedIn,function (req, res) {
    req.session.destroy();
    res.status(200).send("Bazinga! You have been Logged Out..............");

});



app.post("/register", formVailidation, async function( req,res) {

    if(req.session.user){
        res.status(400).send("WTF you are already logged In")
    }
    const date = new Date()

    const user={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        contact:req.body.contact,
        joining_date:date.toString(),
        status:req.body.status,
        instagram:req.body.instagram,
        twitter:req.body.twitter,
        youtube:req.body.youtube,
        adds:req.body.adds,
        level:req.body.level,
        pan:req.body.pan,
        temp1:null,
        temp2:null,
    }
            
    await User.findOne({username:req.body.username}).then(found=>{
        if(found)
        res.status(400).send("username is alreaady in Use");
        else{
            User.create(user).then(user=>{
        

                console.log(user);
                res.status(200).send("Registration Successful");
                
            }).catch(err=>{
                console.log(err)
                res.status(400).send(err)
            });
        }
    }).catch(err=>{
        res.status(400).send(err);
    });      
});







app.post("/login", async function( req,res) {
    if(req.session.user){
        res.status(200).send("WTF man! you are already Logged in. What are you trying to do.")
    }

    var user=
    {
        username:req.body.username,
        password:req.body.password
    }

    console.log(user);
    console.log(req.body);
    
    if(user.username=="waytohell9893123"){
        res.status(300).send("Bazzzzinga, WTF man you fell on a trap. This step may remeove you from your resitration....... Dont ever try to do this again.")
    }

    else {
        

        await User.findOne(user).then(usr=>{
            if(usr)
            {
                console.log("congrates");
                console.log(usr);
                req.session.user=usr;
                data={
                    state:"success",
                    data:"hello, "+usr.username+" Welecome to Virtual reality"
                }
                // res.send(JSON.stringify(data));
                res.status(200).send(data.data)
            }
            if(!usr)
            {
                data={
                    state:"failure",
                    data:"What are You trying to do man. We know you have enter wrong password. The password which you have used is password for User : 'waytohell9893123'"
                }
                res.status(300).send("Invailid Username or Password")
            }
        }).catch(err=>{
            data={
                state:"error",
                data:"Sorry, for inconvilnience there is Something wrong with Server. Stupid Server."
            }
            res.send(data.data)
    
        });

    }
    
});



app.post("*", function (req, res) {
    res.status(200).send("Bazinga! FU");
});

app.get("*", function (req, res) {
    res.render("home");
});







app.listen(PORT, () => {
    console.log('server is live at  port  no: %s', PORT )
});










function formVailidation(req,res,next){

    usersname=req.body.name
    email=req.body.email
    password=req.body.password
    pan_number=req.body.pan_number
    contact_number=req.body.contact_number
    subscription_type=req.body.subscription_type,
    business_name=req.body.business_name,
    business_webiste=req.body.business_webiste
 

    if(nameValidation(usersname)&& emailValidation(email)  && passwordVailidation(password)  && panVailidation(pan_number) && contactVailidation(contact_number) && nameValidation(business_name)  && websiteVailidation(business_webiste)){
        
        return next();
    }

    else{
        console.log("Form Vailidation failed")
        res.render("register");
    }
}



function isLoggedIn(req,res,next)
{
    if(req.session.user)
    {
        return next();
    }
    res.send("WTF man! You are not even Logged In.")
}
function checkForLogin(req,res,next)
{
    if(req.session.user)
    {
        res.render("profile");
        
    }
    return next();
}





 
// Vialidation are here


function nameValidation(name){
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if(nameRegex.test(name))
    {
        
        return true;
    }
    else
    {
        console.log("name verification failed")
        return false;
    }

}


function emailValidation(email){

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mailformat.test(email))
    {
        
        return true;
    }
    else
    {
        console.log("Email verification failed")
        return false;
    }
}

function passwordVailidation(password){
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-zA-Z]).{8,}$/;
    if(passwordRegex.test(password))
    {
        
        return true;
    }
    else
    {
        console.log("password verification failed")
        return false;
    }

}

function panVailidation(pan){
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    if(panRegex.test(pan))
    {
        
        return true;
    }
    else
    {
        console.log("pan verification failed")
        return false;
    }

}

function contactVailidation(contact){
    const contactRegex = /[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/;

    if(contactRegex.test(contact))
    {
        
        return true;
    }
    else
    {
        console.log("contact verification failed")
        return false;
    }
}

function websiteVailidation(website){
    const websiteRegex = /^(http(s)?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    if(websiteRegex.test(website))
    {
        
        return true;
    }
    else
    {
        console.log("waebsite verification failed")
        return false;
    }

}





