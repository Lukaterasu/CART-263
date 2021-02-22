/**************************************************
Template p5 project
Luka Ross


**************************************************/
let data = undefined;
let buttons = [];
let texts = [];
let options = [];
let mirrors = [];

let mirror = {
    sprite: undefined,
    yourself_normal: undefined,
    devil_normal: undefined,
    x: undefined,
    y: undefined,
    width: 1440/2,
    height: 1900/2,
    wiggle: 1

}

let dares = [
    dare1 = {
        
    }
];


let startTime = false;
let timer = 360;
let isTimeUp = false;

let red = "#670000";

let isTime = false;
let isStart = false;
let isPlay = true;
let isEnd = false;
let canDare = true;
let sprite;
let textContent = undefined;
let canInputName = false;
let canInputDate = false;
function preload(){
    data = loadJSON("../assets/data/data.json");
    fontRegular = loadFont('assets/century.ttf');
    fontScary = loadFont('assets/onryou.ttf');
    mirror.sprite = loadImage('assets/images/mirror_empty.png');
    mirror.yourself_normal = loadImage('assets/images/mirror_yourself_normal.png');
    mirror.devil_normal = loadImage('assets/images/mirror_devil_normal.png');



}
let command1;
let commandDare;
// let buttonContent;
// let textContent;
// let noContent;
let riddlesContent = [
    riddle1= {
        question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
        answer: ["a candle", "candle", "is it a candle"]
    },
    riddle2= {
        question: "What is full of holes but still holds water?",
        answer: ["a sponge", "sponge"]
    },
    riddle3= {
        question: "What is always in front of you but can’t be seen?",
        answer: ["the future", "future"]
    }

]



function setup() {
    createCanvas(windowWidth, windowHeight);

    if(annyang){
        
       
       
      
       
       
        textAlign(CENTER);
        textFont(fontRegular);
        
    }

    optionsContent = {
        option1: {

            x: width/2,
            y: height/2+200,
            message: "(proceed by saying yes)",
            size: 30,
            wiggle: 0.5,
            
        },
        option2: {

            x: width/2,
            y: height/2+200,
            message: "(yes or no)",
            size: 30,
            wiggle: 0.5,
            
        }
    }

    buttonContent = {

        button1: {
            x: width/2,
            y: height/2,
            width: 125,
            height: 75,
            text: "start",
            textColour: "0",
            colour: red,
            
            fonction: () => {makeText(textContent.text1); buttons.shift();}
        },
        button2: {
            x: width/2+400,
            y: height/2,
            width: 150,
            height: 75,
            text: "continue",
            textColour: "0",
            colour: red,
            
            fonction: () => {cleanup();makeText(textContent.text8); buttons.shift();}
        },
        button3: {
            x: width/2+400,
            y: height/2,
            width: 150,
            height: 75,
            text: "continue",
            textColour: "0",
            colour: red,
            
            fonction: () => {cleanup(); makeText(textContent.text9); buttons.shift();}
        },
        button4: {
            x: width/2+400,
            y: height/2,
            width: 150,
            height: 75,
            text: "continue",
            textColour: "0",
            colour: red,
            
            fonction: () => {cleanup(); makeText(textContent.text10); buttons.shift(); makeMirror(mirror.yourself_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);

            }
        },
    }

    
    textContent = {
        text1: {
            x: width/4,
            y: height/3+100,
             message: "Are you sure you want to proceed?",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            code: 1,
            fonction: () => {
                command1 = {
                    "*answer": answer => yesNo(answer)
                };
                annyang.addCommands(command1);
                annyang.start();
                makeOption(optionsContent.option1);
            
            },
            yes: () => { cleanup(); makeText(textContent.text2); }
        },
        text2: {
            x: width/4,
            y: height/3+125,
            message: "Before beginning, some conditions have to be met. Do you have salt nearby?",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                command1 = {
                    "*answer": answer => yesNo(answer)
                };
                annyang.addCommands(command1);
                annyang.start();
                makeOption(optionsContent.option2);
               
            
            },
            yes: () => { cleanup(); makeText(textContent.text3);},
            no: () => { cleanup(); makeText(noContent.no1);}
        },
        text3: {
            x: width/2,
            y: height/2,
            message: "Are you wearing any religious ornaments?",
            size: 30,
            colour: red,
            wiggle: 1,
         
            fonction: () => {
                command1 = {
                    "*answer": answer => yesNo(answer)
                };
                annyang.addCommands(command1);
                annyang.start();
                makeOption(optionsContent.option2);
               
            
            },
            no: () => { cleanup(); makeText(textContent.text4);},
            yes: () => { cleanup(); makeText(noContent.no2);}
        },
        text4: {
            x: width/2,
            y: height/2,
            message: "Do you have your phone on you?",
            size: 30,
            colour: red,
            wiggle: 1,
         
            fonction: () => {
                command1 = {
                    "*answer": answer => yesNo(answer)
                };
                annyang.addCommands(command1);
                annyang.start();
                makeOption(optionsContent.option2);
               
            
            },
            no: () => { cleanup(); makeText(textContent.text5);},
            yes: () => { cleanup(); makeText(noContent.no3);}
        },
        text5: {
            x: width/2,
            y: height/2,
            message: "Are you alone?",
            size: 30,
            colour: red,
            wiggle: 1,
         
            fonction: () => {
                command1 = {
                    "*answer": answer => yesNo(answer)
                };
                annyang.addCommands(command1);
                annyang.start();
                makeOption(optionsContent.option2);
               
            
            },
            yes: () => { cleanup(); makeMirror(mirror.sprite, mirror.x, mirror.y, mirror.width, mirror.height, 1); makeText(textContent.text6)},
            no: () => { cleanup(); makeText(noContent.no4);}
        },
        text6: {
            x: width/2,
            y: height/2+300,
            message: "The Devil’s Game has a set of rules you must follow AT ALL COSTS.",
            size: 30,
            colour: red,
            wiggle: 1,
         
            fonction: () => {
                setTimeout(() => { cleanup(); makeText(textContent.text7)}, 3000)
             
             },
        },
        text7: {
            x: width/4,
            y: height/2+300,
            message: "Rule number one. Do NOT spend more than six minutes with the Devil. To end the game, shout 'THANK YOU AND FAREWELL.' If you do not say this, the Devil WON'T leave.",
            size: 30,
            colour: red,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                makeButton(buttonContent.button2);
             
             },
        },
        text8: {
            x: width/4,
            y: height/2+300,
            message: "Rule number two. Do NOT let the Devil out of your sight. No matter what noise, voice, or whisper you hear behind you.",
            size: 30,
            colour: red,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                makeButton(buttonContent.button3);
             },
        },
        text9: {
            x: width/4,
            y: height/2+300,
            message: "Last rule. If there is ever a question you cannot answer, you may ONCE choose to take a dare by saying 'I CHOOSE DARE.' However, make sure to go through with it.",
            size: 30,
            colour: red,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                makeButton(buttonContent.button4);
             },
        },
        text10: {
            x: width/2,
            y: height/2+300,
            message: "Can you see yourself in the mirror?",
            size: 30,
            colour: red,
            wiggle: 1,
            fonction: () => {
                command1 = {
                    "*answer": answer => yesNo(answer)
                };
                annyang.addCommands(command1);
                annyang.start();
                makeOption(optionsContent.option2);
             },
             yes: () => { cleanup(); makeText(textContent.text11)},
             no: () => { cleanup(); makeText(textContent.text10);}
        },
        text11: {
            x: width/2,
            y: height/2+300,
            message: "Remember your appearance. Only when it's your OWN reflection, should you leave...",
            size: 30,
            colour: red,
            wiggle: 1,
            fonction: () => {
                setTimeout(() => { cleanup(); makeText(textContent.text12)}, 3000)
             }
        },
        text12: {
            x: width/2,
            y: height/2+300,
            // message: "You are ready to attempt the Devil’s game. To begin, close your eyes and count to 10. ",
             message: "10. ",
            size: 30,
            colour: red,
            wiggle: 1,
            fonction: () => {
                command1 = {
                    "*answer": answer => counted(answer)
                };
                annyang.addCommands(command1);
                annyang.start();
                // makeOption(optionsContent.option2);
             },
             yes: () => { alert("yes")},
             no: () => { alert("no")}
        },



        

    }
    devilContent  = {
        text1: {
            x: width/2,
            y: height/2+300,
            message: "...",
            size: 30,
            colour: red,
            wiggle: 1,
            fonction: () => {
                setTimeout(() => { cleanup2(); makeText(followUp)}, 3000)
             }
        },
        text2: {
            x: width/4,
            y: height/2+300,
            // message: "Challenger... To win my game, you must simply answer 3 of my questions correctly...",
                        message: "questions correctly...",

            size: 30,
            colour: red,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                setTimeout(() => { cleanup2(); generateQuestion(); makeText(devilContent.text3)}, 3000)
             }
        },
        text3: {
            x: width/4,
            y: height/2+300,
            message: "!!",
            size: 30,
            colour: red,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                command1 = {
                    "*answer": (answer) => {
                        
                       devilContent.text3.answer.forEach(function(data){
                           if(data == answer){
                               alert("sheesh");
                           }
                       })
                    }
                };
                annyang.addCommands(command1);

                //remove
                annyang.start();
             },
             answer: ""
        }


    }
    noContent = {
        no1: {
            x: width/4,
            y: height/3+125,
            message: "Salt will be your only way to restrain the Devil. At the very least, it won't make it easy for him to get to you. ",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
               setTimeout(() => { cleanup(); makeText(textContent.text3)}, 3000)
            
            },

        },
        no2: {
            x: width/4,
            y: height/3+100,
            message: "Remove any religious accessory. They will NOT protect you.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
               setTimeout(() => { cleanup(); makeText(textContent.text4)}, 3000)
            
            },

        },
        no3: {
            x: width/4,
            y: height/3+100,
            message: "Bringing any device while meeting with the Devil is forbidden. Leave it outside the room.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
               setTimeout(() => { cleanup(); makeText(textContent.text5)}, 3000) 
            },

        },
        no4: {
            x: width/4,
            y: height/3+100,
            message: "The Devil won’t show up unless you are alone in the room.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
               setTimeout(() => { cleanup(); makeText(textContent.text6); makeMirror(mirror.sprite, mirror.x, mirror.y, mirror.width, mirror.height, 1);}, 3000) 
            },

        }
    }
    dares = [
        dare1 = {
            x: width/2,
            y:  height/2+300,
            message: "I dare you to cover your eyes for three seconds. Will you do it?",
            size: 30,
            colour: red,
            wiggle: 1,
            fonction: () => {
                command1 = {
                    "*answer": (answer) => {
                        console.log(answer);


                        if(answer == "yes"){
                            alert("dead")
                     
                         } else if(answer == "no"){
                            alert("safe")
                         }
                    }
                };
                annyang.removeCommands("*dare");
                annyang.addCommands(command1);
                makeOption(optionsContent.option2);
               
            
            }
        }
    ];

    

    mirror.x = width/2;
    mirror.y = height/2 - 75;
   
    // makeButton(buttonContent.button1);
    
    makeText(devilContent.text2);
    // makeMirror(mirror.sprite, mirror.x, mirror.y, mirror.width, mirror.height, 0);
    makeMirror(mirror.devil_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);
    isTime = true;

  
    


   
    

   
    
}
let followUp;
function generateQuestion(){
    let question = Math.floor(Math.random() * riddlesContent.length);
    devilContent.text3.message = riddlesContent[question].question;
    devilContent.text3.answer = riddlesContent[question].answer;
    console.log(question);
    riddlesContent.splice(question, 1);
    if(canDare == true){
        commandDare = {

        "*dare": (dare) => {
           

            if(dare == "dare" || dare == "bear"){
               annyang.removeCommands("*answer");
               cleanup2();
               makeText(dares[0]);
               canDare = false;
            }
        }
    }
    
    annyang.addCommands(commandDare);

    }

}
function cleanup(){
    texts.shift(); 
    options.shift();
    annyang.pause();
    annyang.removeCommands("*answer");
}
function cleanup2(){
    texts.shift(); 
    options.shift();
    annyang.removeCommands("*answer");
}
function listener(){
    

}
function dare(dareRequest){
    if(dareRequest== "dare"){
        alert("dare");
    }
}

function yesNo(answer){

    if(answer == "yes"){
       texts[0].yes();


    } else if(answer == "no"){
        texts[0].no();

    }

}

function counted(answer){
    if(answer == "1" || answer == "won"){
        cleanup();
        isTime = true;

        mirrors.pop();
        followUp = devilContent.text2;
        makeMirror(mirror.devil_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);
        setTimeout(() => makeText(devilContent.text1), 2000);
        // annyang.start();
       
       
    } 

}

// function displayOptions(code){
//     if(code == 1){
//         makeOption(optionsContent.option1);
//     }
// }
 let isMirror = false;

function draw() {
    background(0);
    if(isStart){

    }
    if(isPlay) {
      
        userInterface();
        runObjects();
        listener();
        decreaseTimer();
      
        console.log(timer);
        
        
        
    }
    if(isEnd){

    }
}



