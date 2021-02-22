class Button {
    
    constructor(x, y, width, height, text, textColour, colour, fonction) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.text = text;
      this.textColour = textColour;
      this.colour = colour;
      
      this.fonction = fonction;
      this.visible = true;
      
    }
  

    update() {
      if(this.visible == true){
        this.display();
      }
    }
  
  
    display() {
      push();
      rectMode(CENTER);
      fill(this.colour)
      rect(this.x, this.y+5,this.width,this.height);
      textAlign(CENTER, CENTER);
      fill(0)
      textSize(30);
      text(this.text,this.x, this.y)
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

    mousePressed() {
        if (this.overlap(mouseX, mouseY)) {
        this.fonction();
        }
    }

  }