function writeText({x, y, size, colour, wiggle, fonction}){
    let text = new Text(x, y, size, colour, wiggle, fonction);
    texts.push(text);
}

function userInterface(){
    if(startTime == true){
        decreaseTimer();
    }
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    // text("hello", width/2, height/2);
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
    for (let i = 0; i < texts.length; i++) {
        texts[i].update();
    }
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