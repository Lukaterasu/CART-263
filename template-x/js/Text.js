class Text {
    
    constructor(x, y, size, colour, wiggle, fonction) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.colour = colour;
      this.wiggle = wiggle;
      this.fonction = fonction;
      this.visible = true;
      
      if(this.size == undefined){
        this.size = 16;
      }
      if(this.colour == undefined){
        this.colour = "255";
      }
      if(this.wiggle == undefined){
        this.wiggle = "none";
      }
      
    }
  

    update() {
      if(this.visible == true){
        this.display();
      }
    }
  
  
    display() {
      push();
      textAlign(CENTER, CENTER);
      textSize(this.size);
      fill(this.colour)
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