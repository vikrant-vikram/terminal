
var isLogInActive=false
var username = ""
var password = ""

//telles whether user is loggedin or not
var isLoggedIn=false

const input = document.getElementById("terminal-input");
const output = document.querySelector(".terminal-output");
const intro = document.querySelector(".page-intro");
const user = "Login"+ "@PC1 ~ %"


var popupsound = document.getElementById("notifypop");
var keyboard_sound = document.getElementById("keyboardsound");

var is_horror = true


class Stack {
  constructor(maxSize) {
     if (isNaN(maxSize)) {
        maxSize = 10;
     }
     this.maxSize = maxSize;  
     this.container = ["hi"];
  }
  display() {
     console.log(this.container);
  }
  push(element) {
     this.container.push(element);
  }
  pop(){
    this.container.pop()
  }
  getlast(at){
    this.container.at(at)
  }
}
history = new Stack(10);
topOfStack = -1;






input.addEventListener("keydown", async function(event) {
  play_horror();
  // keyboard_sound.play();
  topOfStack= (topOfStack+1)%10 
  

  if (event.key === "Enter") {

    let command = input.value;
    
    output.innerHTML += "<br>" +  user + command;
    input.value = "";

    //Checking whether user is trying to login
    // if user had typed ./login then isloginActive will become true 
    if(!isLogInActive){

      //./profile will print users current information
      if(command == "./profile"){
        output.innerHTML += "<br>" +  user ;
        response = await makeProfileRequest()
        // print responce which have recieved form servver
        typeResponse(response , output, 100)
      }



      // ====================================
      else if(command == "./assignment"){
        output.innerHTML += "<br>" +  user ;
        response =  makeGetAssignmentRequest()
        // print responce which have recieved form servver
        typeResponse(response , output, 100)
      }

      else if(command.includes("./resource")){
        output.innerHTML += "<br>" +  user ;
        response = await makeGetResourceRequest(command.split(" ")[1])
        // print responce which have recieved form servver
        typeResponse(response , output, 100)
      }

      else if(command.includes("./taskdetails")){
        
        output.innerHTML += "<br>" +  user ;
        response = await makeGetTaskDetailsRequest(command.split(" ")[1])
        // print responce which have recieved form servver
        typeResponse(response , output, 100)
      }
      
      
      


      // ========================================
  
      //Thic command will print Intro about the GAME
      else if(command == "./getintro"){
        output.innerHTML += "<br>" +  user ;
        getIntro();
      }


      else if(command == "--help"){
        output.innerHTML += "<br>" +  user ;
        typeResponse("“ The world is nothing but a game of balance. There’s always going to be bad in order to balance out the good.” — Madara Uchiha" , output, 100)
      }



      //IF user want to login
      else if(command == "./login" ){
        username=""
        password=""
        isLogInActive= true
        //Make logout request if user is already logged in
        // response = await makeLogoutRequest()
        output.innerHTML += "<br>" +  user ;
        typeResponse("Enter your username" , output, 100)
      }





      // ----------------------------------LOGOUT----------------------------------------
      // If Command is ./logout make logout request for logout 
      // Check whether command is ./logout 
      else if(command == "./logout"){

        isLogInActive= false
        username=""
        password=""
        // Colling Fxn which will make a sertup for Logout 
        response = await makeLogoutRequest()
        // print responce which have recieved form servver
        typeResponse(response , output, 100)
      }

      else if(command == "./contact"){
        output.innerHTML += "<br>" +  user ;
        response = await makeContactRequest()
        // print responce which have recieved form servver
        typeResponse(response , output, 100)
      }


      else{
        response = await makeChatRequest(command)
        // print responce which have recieved form servver
        typeResponse(response , output, 100)

      }

    }


    else{
      if(!username){
        output.innerHTML += "<br>" +  user ;
        if(!command){
          isLogInActive = false
          typeResponse("Enter Vailid username" , output, 100)
        }
        else{
          typeResponse("Enter your password" , output, 100)
          username= command
        }

      }

      else{
        output.innerHTML += "<br>" +  user ;
        password= command
        if(!password){
          typeResponse("Enter Vailid password" , output, 100)
          isLogInActive = false
        }
        else{
          isLogInActive = false
          response = await  makeLoginRequest(username,password)
          // console.log(response)
          typeResponse(response , output, 100)

        }

      }

    }
  }
  else if(event.key === "ArrowUp"){
    // alert(history.at(topOfStack))
    // topOfStack-=1
    // if(topOfStack == -1){ topOfStack = 9}

  }
});



function play_horror(){
  if(is_horror){
    popupsound.play();
    is_horror=false;
  }
  
}


// function onload(){
//   document.getElementById("terminal-input").autofocus = true;
//   document.getElementById("login-session").innerHTML= "Last login:" +new Date()+ " on ttys000";

// }

Window.onload = function () {
  // popupsound.play();
  document.getElementById("terminal-input").autofocus = true;

  document.getElementById("login-session").innerHTML= "Last login:" +new Date()+ " on ttys000";

}


function getIntro(){
  typeResponse("In the year 2040, a mysterious event caused the world to be overrun by terrifying creatures and supernatural phenomena. People are trapped in their homes, afraid to go outside, and unable to escape the horrors that lurk in the shadows.You play as a character who has been chosen by a secret organization known as <strong>The Guardians </strong> to take part in a dangerous game called <bold>Escape from Reality.<bold> The goal of the game is to survive the night and uncover the truth behind the mysterious event that caused the world to fall into chaos. As you progress through the game, you will encounter a variety of terrifying creatures and supernatural phenomena, each one more frightening than the last. You will have to use all of your wits and resourcefulness to survive and uncover the truth behind the event. The game uses a combination of augmented reality and geolocation technology to immerse players in the game and make them feel like they are truly in the middle of a horror story. But as the game goes on, you will start to question whether the creatures you are facing are real or if they are just manifestations of your own fears and anxieties. As you get closer to the truth, you will start to realize that the game is not just a game, but a test of your own willpower and mental strength. Will you be able to survive the night and uncover the truth behind the event, or will you fall victim to the horrors that await you?", intro, 25)
}




// this function makes Typing Effect 
async function typeResponse(response, writeAt, delay) {

  // response : WHat has to Printed on the screen with typing effect
  // Write : Selected element where changes has to be reflected
  // Delay : Typing speed

  let index = 0;

  while (index < response.length) {
    keyboard_sound.play();
    writeAt.innerHTML += response[index];
    index++;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  keyboard_sound.pause()
}




async function makeLogoutRequest(){

  var data={}
  url="/logout"
  var response = await makePostRequest(url,data)
  return response
 
}




async function makeLoginRequest(username, password){

  var data={
    username:username,
    password:password
  }
  url="/login"
  var response = await makePostRequest(url,data)
  return response
 
}


async function makeContactRequest(){
  var data={}
  url="/contact"
  var response = await makePostRequest(url,data)
  return response

}



async function makeChatRequest(data){
  var data={data:data}
  url="/chat"
  var response = await makePostRequest(url,data)
  return response

}




// =================


async function makeSetAssignmentquest(data){
  url="/setassignment"
  var response = await makePostRequest(url,data)
  return response

}
async function makeGetAssignmentRequest(){
  data =  ''
  url="/getassignment"
  var response = await makePostRequest(url,data)
  return response

}


async function makeSetResourceRequest(data){
  url="/setresource"
  var response = await makePostRequest(url,data)
  return response
}


async function makeGetResourceRequest(data){

  url="/getresouce"
  var response = await makePostRequest(url,data)
  return response
}


async function makeSetResourceTypeRequest(data){

  url="/setresourcetype"
  var response = await makePostRequest(url,data)
  return response

}
async function makeGetResourceRequest(data){

  url="/getresourcetype"
  var response = await makePostRequest(url,data)
  return response

}



async function makeSetResourceTypeRequest(data){

  url="/setresourcetype"
  var response = await makePostRequest(url,data)
  return response

}
async function makeGetResourceTypeRequest(data){

  url="/getresourcetype"
  var response = await makePostRequest(url,data)
  return response

}


async function makeSetTaskDetailsRequest(data){
  url="/settaskdetails"
  var response = await makePostRequest(url,data)
  return response

}
async function makeGetTaskDetailsRequest(data){
  data ={taskid:data}
  url="/gettaskdetails"
  var response = await makePostRequest(url,data)
  return response

}




async function makeSetTaskStatusRequest(data){
  url="/settaskstatus"
  var response = await makePostRequest(url,data)
  return response

}
async function makeGetTaskStatusRequest(data){
  url="/gettaskstatus"
  var response = await makePostRequest(url,data)
  return response
}



async function makeSetTaskTypeRequest(data){
  url="/setTaskType"
  var response = await makePostRequest(url,data)
  return response

}
async function makeGetTaskTypeRequest(data){
  url="/getTaskType"
  var response = await makePostRequest(url,data)
  return response
}

async function makeGetUserStatusRequest(data){
  url="/getuserstatus"
  var response = await makePostRequest(url,data)
  return response
}

async function makeSetUserStatusRequest(data){
  url="/setuserstatus"
  var response = await makePostRequest(url,data)
  return response
}

async function makeRegiterRequest(data){
  url="/reguster"
  var response = await makePostRequest(url,data)
  return response
}











async function makeProfileRequest(){
  var data={}
  url="/profile"
  var response = await makePostRequest(url,data)
  return response

}




async function makePostRequest(url, data){

  // response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // })
  // return response



//   response_data=""
//  await $.post(url,data).then(data=>{
//       response_data = data
//       console.log(data)
//     }).catch(err=>{
//       response_data="errrrroorrrr";
//     });   
//   return response_data
responce = "test"
await $.ajax({
  url: url,
  type: "POST",
  data: data,
  success:  function(data) {
    // Display user details if login successful
    console.log(data);
    responce = JSON.stringify(data) 
  },
  error: function(xhr, status, error) {
    // Display error message if login failed
    console.log(error)
    // console.error(error);
    responce =  error
  }
});

return responce
}


