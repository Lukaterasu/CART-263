"use strict";

/*****************
Where's the imposter?
Luka Ross
Where's Waldo, except with Among Us!
Displays a series of characters, ONE of which is an IMPOSTER. The imposter CHANGES color after every "blink" (every 5 seconds).
******************/

// Constants for image loading
const NUM_ANIMAL_IMAGES = 10;
const ANIMAL_IMAGE_PREFIX = `assets/images/mate`;
const SAUSAGE_DOG_IMAGE = `assets/images/crewmate.png`;

// Number of images to display
const NUM_ANIMALS = 30;

// Array of the loaded animal images
let animalImages = [];
// Array of animal objects
let animals = [];
// Loaded sausage dog image
let sausageDogImage;
// Sausage dog object
let sausageDog;
// intervals between light switches
let lightInterval = 5000;
// total mouse clicks
let clicks = 3;
// timer variables
let timer= 60;
let isTime = true;
// states
let isPlay = true;
let isEnd = false;

// preload()
// Loads all the animal images and the sausage dog image
function preload() {
  // Loop once for each animal image, starting from 0
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    // Load the image with the current number (starting from 0)
    let animalImage = loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`);
    // Add the image to the array for use later when randomly selecting
    animalImages.push(animalImage);
  }

  // Load the sausage dog image
  sausageDogImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);
}


// setup()
// Creates all the animal objects and a sausage dog object
function setup() {
  createCanvas(windowWidth, windowHeight);

  createAnimals();
  createSausageDog();
  setTimeout(lightsOut, lightInterval);
}

function lightsOut(){
  for (let i = 0; i < animals.length; i++) {
    // Update the current animal
    animals[i].visible = false;
    sausageDog.visible = false;
    sausageDog.image = random(animalImages);
    
  }
  setTimeout(function(){
    for (let i = 0; i < animals.length; i++) {
      // Update the current animal
      animals[i].visible = true;
      sausageDog.visible = true;        
    }
    setTimeout(lightsOut, lightInterval);

  },1500);
}

// createAnimals()
// Creates all the animals at random positions with random animal images
function createAnimals() {
  // Create the correct number of animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    // Create one random animal
    let animal = createRandomAnimal();
    // Add it to the animals array
    animals.push(animal);
  }
}

// createRandomAnimal()
// Create an animal object at a random position with a random image
// then return that created animal
function createRandomAnimal() {
  let x = random(100, width-100);
  let y = random(100, height-100);
  let animalImage = random(animalImages);
  let animal = new Animal(x, y, animalImage);
  return animal;
}

// createSausageDog()
// Creates a sausage dog at a random position
function createSausageDog() {
  let x = random(100, width-100);
  let y = random(100, height-100);
  let randomSprite;
  sausageDog = new SausageDog(x, y, random(animalImages));
}

// draw()
// Draws the background then updates all animals and the sausage dog
function draw() {

  background(255);

  if(isPlay == true){
    updateAnimals();
    updateSausageDog();
    increaseTimer();
    userInterface();
  }
  if(isEnd == true){
  push();
  textAlign(CENTER, CENTER);
  textSize(width / 25);
  fill(0);
  text("defeat", width/2, height/2);
  pop();
  }
 
}

// displays time left and remaing clicks
function userInterface(){
push();
textAlign(CENTER, CENTER);
textSize(width / 25);
fill(0);
text("Time remaining: "+timer, width/2, 100);
text("Clicks left: "+clicks, width/2, height-100);
pop();
if(clicks <= 0 || timer <= 0){
  isEnd = true;
  isPlay = false;
}
}

// should be called decrease timer...
function increaseTimer() {
	if (isTime == true) {
		timer = timer - 1;
		setTimeout(function () {
			isTime = true;
		}, 1000);
		isTime = false;
	}
}

// updateAnimals()
// Calls the update() method for all animals
function updateAnimals() {
  // Loop through all animals
  for (let i = 0; i < animals.length; i++) {
    // Update the current animal
    animals[i].update();
  }
}

// updateSausageDog()
// Calls the update() method of the sausage dog
function updateSausageDog() {
  sausageDog.update();
}

// mousePressed()
// Automatically called by p5 when the mouse is pressed.
// Call the sausage dog's mousePressed() method so it knows
// the mouse was clicked.
function mousePressed() {
  sausageDog.mousePressed();
  
}

function mouseClicked(){
  clicks = clicks - 1;
  console.log(clicks);
}