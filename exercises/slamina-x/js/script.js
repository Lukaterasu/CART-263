/**************************************************
Template p5 project
Luka Ross


Name as many animals as you can before time runs out.
You only need to say the animal's name.
Skipping an animal will reduce your timer.
Start by pressing "Replay".

Sorry for the messy code :{

**************************************************/


const animals =  [
    "aardvark",
    "alligator",
    "alpaca",
    "antelope",
    "ape",
    "armadillo",
    "baboon",
    "badger",
    "bat",
    "bear",
    "beaver",
    "bison",
    "boar",
    "buffalo",
    "bull",
    "camel",
    "canary",
    "capybara",
    "cat",
    "chameleon",
    "cheetah",
    "chimpanzee",
    "chinchilla",
    "chipmunk",
    "cougar",
    "cow",
    "coyote",
    "crocodile",
    "crow",
    "deer",
    "dingo",
    "dog",
    "donkey",
    "dromedary",
    "elephant",
    "elk",
    "ewe",
    "ferret",
    "finch",
    "fish",
    "fox",
    "frog",
    "gazelle",
    "gila monster",
    "giraffe",
    "gnu",
    "goat",
    "gopher",
    "gorilla",
    "grizzly bear",
    "ground hog",
    "guinea pig",
    "hamster",
    "hedgehog",
    "hippopotamus",
    "hog",
    "horse",
    "hyena",
    "ibex",
    "iguana",
    "impala",
    "jackal",
    "jaguar",
    "kangaroo",
    "koala",
    "lamb",
    "lemur",
    "leopard",
    "lion",
    "lizard",
    "llama",
    "lynx",
    "mandrill",
    "marmoset",
    "mink",
    "mole",
    "mongoose",
    "monkey",
    "moose",
    "mountain goat",
    "mouse",
    "mule",
    "muskrat",
    "mustang",
    "mynah bird",
    "newt",
    "ocelot",
    "opossum",
    "orangutan",
    "oryx",
    "otter",
    "ox",
    "panda",
    "panther",
    "parakeet",
    "parrot",
    "pig",
    "platypus",
    "polar bear",
    "porcupine",
    "porpoise",
    "prairie dog",
    "puma",
    "rabbit",
    "raccoon",
    "ram",
    "rat",
    "reindeer",
    "reptile",
    "rhinoceros",
    "salamander",
    "seal",
    "sheep",
    "shrew",
    "silver fox",
    "skunk",
    "sloth",
    "snake",
    "squirrel",
    "tapir",
    "tiger",
    "toad",
    "turtle",
    "walrus",
    "warthog",
    "weasel",
    "whale",
    "wildcat",
    "wolf",
    "wolverine",
    "wombat",
    "woodchuck",
    "yak",
    "zebra"
  ];
let currentAnimal = "";
let reverseAnimal = "";
let currentAnswer = "[nothing]";
let remainingChances = 3;
let points = 0;
let buttons = [];
let startTime = false;
let timer = 60;
let isTime = true;
let playButton;

// setup()
//
// Description of setup() goes here.
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
    playButton = {
        x: width/2-100,
        y: height/2,
        width: 100,
        height: 100,
        text: "replay",
        textColour: "0",
        colour: "yellow",
        fonction: animalCall

    }

    skipButton = {
        x: width/2+100,
        y: height/2,
        width: 100,
        height: 100,
        text: "skip",
        textColour: "0",
        colour: "red",
        fonction: skipAnimal

    }


    makeButton(playButton);
    makeButton(skipButton);
    currentAnimal = random(animals);
    reverseAnimal = reverseString(currentAnimal);
   
    
}
 
// draw()
//
// Description of draw() goes here.
function draw() {
    background(0);
    
    if(timer <= 0){
        fill(255);
        textSize(50);
        text("Score: "+ points, width/2, height/2);

    } else {

        userInterface();
  
        listener();
        runObjects();

    }
    
    
}

function userInterface(){
    if(startTime == true){
        decreaseTimer();
    }
    push();
    fill(255);
    text("Time remaining: "+ timer, width/2, 100);
    text("Points: "+ points, width/2, 200);

    pop();
}

function makeButton({x, y, width, height, text, textColour, colour,fonction}){
    
    let button = new Button(x, y, width, height, text, textColour, colour, fonction);
    buttons.push(button);
    
}

function runObjects(){
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].update();
      }
}


function skipAnimal(){
    newAnimal();
    startTime = true;
    timer -= 5;
}

function newAnimal(){
    currentAnimal = random(animals);
    reverseAnimal = reverseString(currentAnimal);
    responsiveVoice.speak(reverseAnimal);

}



function animalCall(){
    startTime = true;
    responsiveVoice.speak(reverseAnimal);
}
let currentFill;
function listener(){
    if(currentAnswer == currentAnimal){
        points += 1;
        newAnimal();
        fill(0,255,255);
        
    }else{
        fill(255,0,0);
        
    }
    text("'"+ currentAnswer +"'", width/2, height/2+250);
    
}



function decreaseTimer() {
	if (isTime == true) {
		timer = timer - 1;
		setTimeout(function () {
			isTime = true;
		}, 1000);
		isTime = false;
	}
}
function guessAnimal(animal){
    currentAnswer = animal.toLowerCase();
    console.log(currentAnswer);
    
}

function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split('');
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join('');
    // Return the result
    return result;
}
function mouseClicked() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].mousePressed();
    }
    
  }
