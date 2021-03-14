
//I recoded everything to find a more effective program


let poems = ["We all go a little mad sometimes.","Walls have ears. Doors have eyes.","Every day is Halloween, isn't it? For some of us.","Sometimes the things in our heads are far worse than anything they could put in books or on film.","Is evil something you are? Or is it something you do?", "I don’t live in darkness, darkness lives in me."];

let ps = document.querySelectorAll("p");

for (let i = 0; i < ps.length; i++) {

    const element = ps[i];
    let rand = Math.floor(Math.random() * poems.length);
    element.innerHTML = poems[rand];
    poems.splice(rand, 1);
    
    element.addEventListener("click", () => {
    
        element.classList.remove("fadeIn");
        element.classList.remove("shake");
       element.classList.add("fadeOut");

    });
    element.addEventListener("animationend", endFade);

   
}

function endFade(){
    let rand = Math.floor(Math.random() * poems.length);
    this.innerHTML = poems[rand];
    poems.splice(rand, 1);
    if(poems.length <=0){
     poems = ["one","two","three","four","five", "six"];
    }
    this.classList.remove("fadeOut");
    this.classList.add("fadeIn");
    this.removeEventListener("animationend",endFade);
    this.addEventListener("animationend", ()=> {
        this.classList.add("shake");
        this.addEventListener("animationend", endFade);
    });

}