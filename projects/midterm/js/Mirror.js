class Mirror {
    
    constructor(sprite, x, y, width, height,wiggle) {
        this.sprite = sprite;
      this.x = x;
      this.y = y;
      this.originX = x;
      this.originY = y;
      this.width = width;
      this.height = height;
      this.wiggle = wiggle;
      this.isAppeared = false;
      this.startOpacity = 0;
      this.visible = true;
      this.canFadeOut = false;
      this.isFadeOut = false;
    
    
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
            this.fadeIn();
          }
        if(this.canFadeOut == true){
          this.fadeOut();
        }
          this.wiggleImage();
      }
    }
  
  
    display() {
      push();
      
      imageMode(CENTER);
        tint(255, this.startOpacity);
        image(this.sprite, this.x, this.y, this.width, this.height);
      pop();
    }
  
  
    
    fadeIn(){
       
        if(this.startOpacity < 255 &&this.isAppeared == false){
          this.startOpacity += 2; 
        } else if(this.startOpacity >= 255){
          this.isAppeared = true;
        }

    }

    // fadeOut(){

    //   if(this.startOpacity > 0){
    //     this.startOpacity = this.startOpacity - 2; 
    //   } else if(this.startOpacity <= 0){
          

    //     this.canFadeOut = false;
    //     this.visible = false;
    //   }
     

     

    // }

    wiggleImage(){
        this.x = random(this.originX-this.wiggle, this.originX+this.wiggle);
        this.y = random(this.originY-this.wiggle, this.originY+this.wiggle);
    }

    

  }