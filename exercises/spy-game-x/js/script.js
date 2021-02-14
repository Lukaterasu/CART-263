/**************************************************
Template p5 project
Luka Ross


**************************************************/
let data = undefined;
let buttons = [];
let texts = [];
let startTime = false;
let timer = 60;

let isTime = true;
let isStart = false;
let isPlay = true;
let isEnd = false;

let textContent = undefined;
let canInputName = false;
let canInputDate = false;
function preload(){
    data = loadJSON("../assets/data/data.json");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    if(annyang){
        
       
       
      
       
        textSize(32);
        textStyle(BOLD);
        textAlign(CENTER);
        fill(255);
        
    }


    textContent = {
        text1: {
            x: width/2,
            y: height/2,
            message: "Welcome to the Time Capsule",
            size: 30,
            colour: "yellow",
            wiggle: 1,
            fonction: () => {setTimeout(() => {texts.shift(); makeText(textContent.text2)}, 3000)}
        },
        text2: {
            x: width/2,
            y: height/2,
            message: "You may write a message to send yourself in the future.",
            size: 30,
            colour: "yellow",
            wiggle: 1,
            fonction: () => {setTimeout(() => {texts.shift(); makeText(textContent.text3)}, 3000)}
        },
        text3: {
            x: width/2,
            y: height/2,
            message: "Please state your name.",
            size: 30,
            colour: "yellow",
            wiggle: 1,
            fonction: () => {canInputName =true}
        },
        text4: {
            x: width/2,
            y: height/2,
            message: "",
            size: 30,
            colour: "yellow",
            wiggle: 1,
        },
        text5: {
            x: width/2,
            y: height/2,
            message: "Please state the current date.",
            size: 30,
            colour: "yellow",
            wiggle: 1,
            fonction: () => {canInputDate =true}
        },
        text6: {
            x: width/2,
            y: height/2,
            message: "",
            size: 30,
            colour: "yellow",
            wiggle: 1,
        },
        text7: {
            x: width/2,
            y: height/2,
            message: "Please state a message you wish to send yourself.",
            size: 30,
            colour: "yellow",
            wiggle: 1,
            // fonction: () => {canInputDate =true}
        },
        text8: {
            x: width/2,
            y: height/2,
            message: "",
            size: 30,
            colour: "yellow",
            wiggle: 1,
        }

        

    }

    // makeButton(playButton);
    makeText(textContent.text5);
    

   
    
}

function listener(){
    
    if(canInputName == true){
            let command = {
                "*name": name => data.user.name = name
            };
            annyang.addCommands(command);
            annyang.start();
        if(data.user.name != ""){
            texts.shift(); 
            textContent.text4.message = "Is your name "+ data.user.name + "?";
            makeText(textContent.text4);
            canInputName = false;

            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
                if(userSaid == "yes" || userSaid == phrases){
                localStorage.setItem('name', data.user.name);
                texts.shift(); 
                makeText(textContent.text5);
                annyang.removeCommands();
                } else if(userSaid == "no"){
                texts.shift();
                data.user.name = "";
                makeText(textContent.text3);
                }
               });
        }
        
    }



       
       
        if(canInputDate == true){
            let command = {
                "*date": (date) => {data.user.date = date}
            };
            annyang.addCommands(command);
            annyang.start();
        if(data.user.date != ""){
            texts.shift(); 
            textContent.text6.message = "Is the date "+ data.user.date + "?";
            makeText(textContent.text6);
            canInputDate = false;

            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
                if(userSaid == "yes"|| userSaid == phrases){
                    alert(data.user.date);
                // localStorage.setItem('date', data.user.date);
                texts.shift(); 
                makeText(textContent.text7);
                annyang.removeCommands();
                } else if(userSaid == "no"){
                texts.shift();
                data.user.date = "";
                makeText(textContent.text5);
                }
               });
        }
        
    }
    console.log(canInputDate);
    

}
 
function draw() {
    background(0);
    if(isStart){

    }
    if(isPlay) {
        userInterface();
        runObjects();
        listener();
        
    }
    if(isEnd){

    }
}



