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

function preload(){
    data = loadJSON("assets/data/data.json");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    if(annyang){
        let commands = {
            "*animal": guessAnimal
        };

        annyang.addCommands(commands);
        annyang.start();

        textSize(32);
        textStyle(BOLD);
        textAlign(CENTER);
    }
    // playButton = {
    //     x: width/2-100,
    //     y: height/2,
    //     width: 100,
    //     height: 100,
    //     text: "replay",
    //     textColour: "0",
    //     colour: "yellow",
    //     fonction: animalCall

    // }

    // makeButton(playButton);

   
    
}
 
function draw() {
    background(0);
    if(isStart){

    }
    if(isPlay) {
        userInterface();
        runObjects();
    }
    if(isEnd){

    }
}



