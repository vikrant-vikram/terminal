const input = document.getElementById("terminal-input");
const output = document.querySelector(".terminal-output");
const intro = document.querySelector(".page-intro");
const user = "user-random_number@PC1 ~ %"


var popupsound = document.getElementById("notifypop");



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



input.addEventListener("keydown", function(event) {
  play_horror();
  topOfStack= (topOfStack+1)%10 
  

  if (event.key === "Enter") {
    let command = input.value;
    output.innerHTML += "<br>" +  user + command;
    input.value = "";

    if(command == "/print"){
      output.innerHTML += "<br>" +  user ;
      
      typeResponse("HI " + user+ " Level : 0, Success Ratio : 0.0 , Task Completed : 0", output, 100)
      
    }
    if(command == "/getintro"){
      output.innerHTML += "<br>" +  user ;
      getIntro();
    }
    if(command == "/help"){
      output.innerHTML += "<br>" +  user ;
      typeResponse("“ The world is nothing but a game of balance. There’s always going to be bad in order to balance out the good.” — Madara Uchiha" , output, 100)
    }
  }
  else if(event.key === "ArrowUp"){
    // alert(history.at(topOfStack))
    // topOfStack-=1
    // if(topOfStack == -1){ topOfStack = 9}

  }
});



function play_horror(){
  popupsound.play();
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
    writeAt.innerHTML += response[index];
    index++;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}


