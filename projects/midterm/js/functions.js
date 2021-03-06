
// i created a set way to create text, images, and buttons.
function makeText({x, y, message, size, colour, wiggle, align, width, height, code, yes, no, fonction,scary}){
    let text = new Text(x, y, message, size, colour, wiggle, align, width, height, code, yes, no, fonction, scary);
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
   
    push();
    textAlign(CENTER, CENTER);
    fill(255);
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
        makeMirror(mirror.cracked, mirror.x, mirror.y, mirror.width, mirror.height, 0);
        annyang.removeCommands();
        command1 = {
            "*answer": () => {
               
                    cleanup2();
                   followUp = endingContent.ending7;
                   makeText(devilContent.text1);

                 }
                
            }
        
        annyang.addCommands(command1);
        annyang.start();
    }
}

function mouseClicked() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].mousePressed();
    }
    
  }

//makes background red
function makeRed(){ 
    bgColour+= 1;
    bgColour = constrain(bgColour, 0, 200);
    if(bgColour >= 200){
        isRed = false;
    }
}