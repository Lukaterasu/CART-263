function makeText({x, y, message, size, colour, wiggle, align, width, height, code, yes, no, fonction}){
    let text = new Text(x, y, message, size, colour, wiggle, align, width, height, code, yes, no, fonction);
    texts.push(text);
}

function makeOption({x, y, message, size, wiggle, align, width, height}){
    let option = new Options(x, y, message, size, wiggle, align, width, height);
    options.push(option);
}
function makeMirror(sprite, x, y, width, height,wiggle){
    let mirror = new Mirror(sprite, x, y, width, height,wiggle);
    mirrors.push(mirror);
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

function makeButton({x, y, width, height, text, textColour, colour, fonction}){
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
    for (let i = 0; i < options.length; i++) {
        options[i].update();
    }
    for (let i = 0; i < mirrors.length; i++) {
        mirrors[i].update();
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
    if(timer <= 0){
        isTimeUp = true;
    }
}

function mouseClicked() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].mousePressed();
    }
    
  }