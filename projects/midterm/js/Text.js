class Text {
    
    constructor(x, y, message, size, colour, wiggle, align, width, height, code, yes, no, fonction, scary) {
      this.x = x;
      this.y = y;
      this.originX = x;
      this.originY = y;
      this.message = message;
      this.currentMessage = "";
      this.characters = this.message.split("");
      this.characterDelay = false;
      this.size = size;
      this.colour = colour;
      this.wiggle = wiggle;
      this.align = align;
      this.width = width;
      this.height = height;
      this.code = code;
      this.yes = yes;
      this.no = no;
      this.fonction = fonction;
      this.scary = scary;
      this.font = undefined
      this.isWritten = false;
      this.visible = true;
      this.hasEnded = false;
    
    
      if(this.size == undefined){
        this.size = 16;
      }
      if(this.colour == undefined){
        this.colour = "255";
      }
      if(this.wiggle == undefined){
        this.wiggle = "0";
      }
      if(this.scary == true){
        this.font = fontScary;
       
      } else{
        this.font = fontRegular;
      }
      
    }
  

    update() {
      if(this.visible == true){
        this.display();
        this.writeText();
        this.wiggleText();
        this.endingFunction();
        
      }
    }
  
  
    display() {
      push();
      textAlign(this.align);
      textSize(this.size);
      textFont(this.font);
      fill(this.colour)
      text(this.currentMessage,this.x, this.y, this.width, this.height);
      pop();
    }
  
  
    overlap(x, y) {
      if (x > this.x - this.width / 2 &&
        x < this.x + this.width / 2 &&
        y > this.y - this.height / 2 &&
        y < this.y + this.height / 2) {
        return true;
      }
      else {
        return false;
      }
    }
    endingFunction(){
        if(this.fonction){
            if(this.isWritten == true&& this.hasEnded == false){
                this.fonction();
                this.hasEnded = true;
            }
        }
    }
    writeText(){

        if(this.isWritten == false){
            if(this.characterDelay == false){
                if(this.characters.length <= 0){
                    this.isWritten = true;
                } else{
                    this.currentMessage = this.currentMessage + this.characters[0];
                    this.characters.shift();
                    this.characterDelay = true;
                    setTimeout(() => this.characterDelay = false , 80);
                }
               
            }
           
        }

    }

    wiggleText(){
        this.x = random(this.originX-this.wiggle, this.originX+this.wiggle);
        this.y = random(this.originY-this.wiggle, this.originY+this.wiggle);
    }

    mousePressed() {
        if (this.overlap(mouseX, mouseY)) {
        this.fonction();
        }
    }

  }