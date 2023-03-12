


const input = document.getElementById("terminal-input");
const output = document.querySelector(".terminal-output");
const intro = document.querySelector(".page-intro");
const user = "user-random_number@PC1 ~ %"


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

isLogInActive=false
username = ""
password = ""





input.addEventListener("keydown", async function(event) {
  play_horror();
  // keyboard_sound.play();
  topOfStack= (topOfStack+1)%10 
  

  if (event.key === "Enter") {

    let command = input.value;
    
    output.innerHTML += "<br>" +  user + command;
    input.value = "";

    if(!isLogInActive){

      if(command == "./print"){
        output.innerHTML += "<br>" +  user ;
        typeResponse("HI " + user+ " Level : 0, Success Ratio : 0.0 , Task Completed : 0", output, 100)
      }
  
  
      else if(command == "./getintro"){
        output.innerHTML += "<br>" +  user ;
        getIntro();
      }
  
  
      else if(command == "--help"){
        output.innerHTML += "<br>" +  user ;
        typeResponse("“ The world is nothing but a game of balance. There’s always going to be bad in order to balance out the good.” — Madara Uchiha" , output, 100)
      }
  
  
      else if(command == "./login"){
        isLogInActive= true
        output.innerHTML += "<br>" +  user ;
        typeResponse("Enter your username" , output, 100)
      }

      else if(command == "./logout"){
        isLogInActive= false
        username=""
        password=""
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
          response = await makeLoginRequest(username,password)
          console.log(response.body)
          // typeResponse(response.data , output, 100)

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




async function makeLoginRequest(username, password){

  data={
    username:username,
    password:password
  }
  url="/temp"
  response = await makePostRequest(url,data)
  return response
 
}




async function makePostRequest(url, data){

  response = await fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response

}