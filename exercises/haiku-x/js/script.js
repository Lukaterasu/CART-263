
//I recoded everything to find a more effective program


let poems = ["one","two","three","four","five", "six"];

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