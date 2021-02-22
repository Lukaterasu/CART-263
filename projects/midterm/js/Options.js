class Options {
    
    constructor(x, y, message, size, wiggle, align, width, height) {
      this.x = x;
      this.y = y;
      this.originX = x;
      this.originY = y;
      this.message = message;
      this.size = size;
      this.wiggle = wiggle;
      this.align = align;
      this.width = width;
      this.height = height;
      this.isAppeared = false;
      this.startColour = 0;
      this.visible = true;
    
    
      if(this.size == undefined){
        this.size = 16;
      }
      if(this.colour == undefined){
        this.colour = "255";
      }
      if(this.wiggle == undefined){
        this.wiggle = "0";
      }
      
    }
  

    update() {
      if(this.visible == true){
        this.display();
        if(this.isAppeared == false){
          this.writeText();
        }
        
        this.wiggleText();
        
      }
    }
  
  
    display() {
      push();
      textAlign(this.align);
      textSize(this.size);
      fill(this.startColour);
      text(this.message,this.x, this.y, this.width, this.height);
      pop();
    }
  
  
    
    writeText(){

        if(this.startColour <= 25 &&this.isAppeared == false){
          this.startColour += 0.1; 
        } else{
          this.isAppeared = true;
        }

    }

    wiggleText(){
        this.x = random(this.originX-this.wiggle, this.originX+this.wiggle);
        this.y = random(this.originY-this.wiggle, this.originY+this.wiggle);
    }

    

  }