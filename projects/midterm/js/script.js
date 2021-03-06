/**************************************************
Template p5 project
Luka Ross


**************************************************/
// Json
let data = undefined;
// Object arrays
let buttons = [];
let texts = [];
let options = [];
let mirrors = [];
// everything related to images
let mirror = {
    sprite: undefined,
    cracked: undefined,
    yourself_normal: undefined,
    yourself_happy: undefined,
    yourself_old: undefined,
    devil_normal: undefined,
    devil_behind: undefined,
    devil_jumpscare: undefined,
    devil_smile: undefined,
    impostor_normal: undefined,
    impostor_smile: undefined,
    impostor_jumpscare: undefined,
    x: undefined,
    y: undefined,
    width: 1440/2,
    height: 1900/2,
    wiggle: 1

}
// cant remember
let dares = [
    dare1 = {
        
    }
];
let fontRegular;
// vatiables related to the timer
let timer = 180;
let isTimeUp = false;
let isTime = false;
// the shade of red i use
let red = "#670000";
// states of the game
let isPlay = true;
let isEnd = false;
// checks how many answers did the player get right, and which question he is at
let chances = 3;
let answerCount = 0;
// did the player get the answer right
let isRightAnswer = false;
// the text that follows "..."
let followUp;
// checks if player can say a dare
let canDare = true;
// huge text array
let textContent = undefined;
// command i use everywhere
let command1;
// did the player double check his reflection??
let isImpostor = false;
// variables to change background color
let isRed = false;
let bgColour = 0;
// message to be displayed a the end
let endMessage = "gg";
// at one point, an imposter will appear in place of the user...
let notImpostor;
let backgroundSound;
let didDare = false;


// loading all my images and fonts
function preload(){
    data = loadJSON("assets/data/data.json");
    fontRegular = loadFont('assets/century.TTF');
    fontScary = loadFont('assets/onryou.TTF');
    mirror.sprite = loadImage('assets/images/mirror_empty.png');
    mirror.yourself_normal = loadImage('assets/images/mirror_yourself_normal.png');
    mirror.yourself_happy = loadImage('assets/images/mirror_yourself_happy.png');
    mirror.yourself_old = loadImage('assets/images/mirror_yourself_old.png');
    mirror.devil_normal = loadImage('assets/images/mirror_devil_normal.png');
    mirror.devil_behind = loadImage('assets/images/mirror_devil_behind.png');
    mirror.devil_smile = loadImage('assets/images/mirror_devil_smile.png');
    mirror.devil_jumpscare = loadImage('assets/images/mirror_devil_jumpscare.png');
    mirror.impostor_normal = loadImage('assets/images/mirror_impostor_normal.png');
    mirror.impostor_smile = loadImage('assets/images/mirror_impostor_smile.png');
    mirror.impostor_jumpscare = loadImage('assets/images/mirror_impostor_jumpscare.png');
    mirror.cracked = loadImage('assets/images/mirror_cracked.png');
    backgroundSound = loadSound("assets/sounds/background.mp3");
}

// riddles and their answers (don't look)
let riddlesContent = [
    riddle1= {
        question: "'I’m tall when I’m young, and I’m short when I’m old. What am I?'",
        answer: ["a candle", "candle", "is it a candle"]
    },
    riddle2= {
        question: "'What is full of holes but still holds water?'",
        answer: ["a sponge", "sponge"]
    },
    riddle3= {
        question: "'What is always in front of you but can’t be seen?'",
        answer: ["the future", "future"]
    },
    riddle4= {
        question: "'What can you keep after giving to someone?'",
        answer: ["word", "your word"]
    },
    riddle5= {
        question: "'The more of this there is, the less you see. What is it?'",
        answer: ["darkness", "the darkness", "the dark"]
    }
]

// LOTS OF DATA
function setup() {
    createCanvas(windowWidth, windowHeight);
    if(annyang){
        textAlign(CENTER);
        textFont(fontRegular);
    }
    backgroundSound.play();
	backgroundSound.setVolume(0.5);
    // these will indicate what the player can say
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
        },
        option02: {
            x: width/2,
            y: height/2+400,
            message: "(yes or no)",
            size: 30,
            wiggle: 0.5,  
        }
    }
   
    // data for the buttons
    buttonContent = {
        button1: {
            x: width/2,
            y: height/2,
            width: 125,
            height: 75,
            text: "start",
            textColour: "0",
            colour: red,
            fonction: () => {makeText(textContent.text0); buttons.shift();}
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
            fonction: () => {cleanup(); makeText(textContent.text10); buttons.shift(); mirrors.shift();makeMirror(mirror.yourself_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);
            }
        },
        button5: {
            x: width/2+400,
            y: height/2,
            width: 150,
            height: 75,
            text: "leave",
            textColour: "0",
            colour: red,
            fonction: () => {
                if(isTimeUp == true){
                }
                else if(isImpostor == false){
                    cleanup()
                    mirrors.shift();
                    isPlay = false;
                    isEnd = true;
                } else {
                    clearTimeout(notImpostor);
                    cleanup2();
                    followUp = impostorContent.impostor1;
                    makeText(devilContent.text1); 
                }
                buttons.shift();
            }
        },
        button6: {
            x: width/2+400,
            y: height/2,
            width: 150,
            height: 75,
            text: "leave",
            textColour: "0",
            colour: red,
            fonction: () => {
               cleanup2();
               isRed = true;
                followUp = endingContent.ending007;
                makeText(devilContent.text1);  
            }
        }
    }
// data for the first part of the simulation
    textContent = {
        text0: {
            x: width/4,
            y: height/2,
             message: "If you beat the Devil at his game, he will owe you a favour. If you lose, your soul will be at his mercy.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            code: 1,
            fonction: () => {
               setTimeout(()=>{cleanup();makeText(textContent.text1)}, 3000)
            }
        },
        text1: {
            x: width/4,
            y: height/2,
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
            y: height/2,
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
            x: width/4,
            y: height/2+300,
            message: "The Devil’s Game has a set of rules you must follow, for your own safety.",
            size: 30,
            colour: red,
            wiggle: 1,
            width:width/2,
            fonction: () => {
                setTimeout(() => { cleanup(); makeText(textContent.text7)}, 3000)
             },
        },
        text7: {
            x: width/4,
            y: height/2+300,
            message: "Rule number one. Do NOT spend more than three minutes with the Devil. To end the game, shout 'FAREWELL.'",
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
            message: "Last rule. If there is ever a question you cannot answer, you may ONCE choose to take a dare by saying 'I CHOOSE DARE.'",
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
                makeOption(optionsContent.option02);
             },
             yes: () => { cleanup(); makeText(textContent.text11)},
             no: () => { cleanup(); makeText(textContent.text10);}
        },
        text11: {
            x: width/4,
            y: height/2+300,
            message: "Remember your appearance. Only when it's your OWN reflection, should you leave...",
            size: 30,
            colour: red,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                setTimeout(() => { cleanup(); makeText(textContent.text12)}, 3000)
             }
        },
        text12: {
            x: width/4,
            y: height/2+300,
            message: "You are ready to attempt the Devil’s game. To begin, close your eyes and count down from 7. ",
            size: 30,
            colour: red,
            wiggle: 1,
            width:width/2,  
            fonction: () => {
                // once the player counts down, the devil will appear
                command1 = {
                    "*answer": answer => counted(answer)
                };
                annyang.addCommands(command1);
                annyang.start();
             }
        },
    }

    // data for the second part of the simulation
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
            message: "'Challenger... To win my game, you must simply answer 3 of my questions correctly...'",
            size: 30,
            colour: red,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                setTimeout(() => { 
                    cleanup2(); 
                    generateQuestion(); 
                    makeText(devilContent.text3);
                   
                }, 3000)
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
                isRightAnswer = false;
                command1 = {
                    "*answer": function(userSaid){
                        console.log(userSaid);
                    if((userSaid.toLowerCase() == "i choose dare" || userSaid.toLowerCase() == "i choose bear"|| userSaid.toLowerCase() == "i choose there")&&(canDare == true)){
                        answerCount = answerCount + 1;
                        annyang.removeCommands("*answer");
                        cleanup2();
                        makeText(dares[0]);
                        canDare = false;
                    } else if((userSaid.toLowerCase() == "dare" || userSaid.toLowerCase() == "bear"|| userSaid.toLowerCase() == "there")&&(canDare == false)){
                        alert("you can only dare once");
                        annyang.removeCommands("*answer");
                        cleanup2();
                        makeText(devilContent.text3);
                    } else if(userSaid.toLowerCase() == "farewell"){
                       
                        ending();
                    }else{

                        devilContent.text3.answer.forEach(function(data){
                            if(data == userSaid.toLowerCase()){
                                isRightAnswer = true;
                            } 
                        })
                        if(isRightAnswer!= true){
                         chances = chances -1;
                         chances = constrain(chances, 0, 3);
                        } 
                        answerCount = answerCount + 1;
                        annyang.removeCommands('*answer');
                        if(answerCount >= 3){
                            
                            ending();
                        }else{
                         cleanup2();
                         generateQuestion();
                         followUp = devilContent.text3;
                         makeText(devilContent.text1);
                        }

                    }
                      
                      
                    }
                    

                   
                };
               
               
                annyang.addCommands(command1);
               
                annyang.start();
             },
             answer: ""
        }


    }

    // data for when the user responds "no"
    noContent = {
        no1: {
            x: width/4,
            y: height/2,
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
            y: height/2,
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
            y: height/2,
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
            y: height/2,
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

    // determines the end result
    endingBool = {
        ending1: false,
        ending2: false,
        ending3: false,
        ending4: false,
        ending5: false,
        ending6: false
    }

    // data for the ending
    endingContent = {
        ending1: {
            x: width/4,
            y: height/2+300,
            message: "The Devil gives you a nod before disappearing.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                    mirrors.shift();
                    cleanup2();
                    makeMirror(mirror.yourself_happy, mirror.x, mirror.y, mirror.width, mirror.height, 0);
                    makeText(endingContent.ending01);



                }, 3000);
            },

        },
        ending01: {
            x: width/4,
            y: height/2+300,
            message: "You leave your encounter with a feeling of satisfaction.",
            size: 30,
            colour: 255,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {

                    makeButton(buttonContent.button5);
                    

                }, 3000);
            },

        },
        ending2: {
            x: width/4,
            y: height/2+300,
            message: "...",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                setTimeout(() => {
                  
                    mirrors.shift();
                    
                    cleanup2();
                    makeMirror(mirror.impostor_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);
                    makeText(endingContent.ending02);



                }, 3000);
             
               
                
            },

        },
        ending02: {
            x: width/4,
            y: height/2+300,
            message: "You leave your encounter with the Devil. Everything seems normal.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                isImpostor = true;
                
                notImpostor = setTimeout(()=> {
                    isImpostor = false;
                    mirrors.shift();
                    makeMirror(mirror.yourself_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);
                    
                }, 4000);
                makeButton(buttonContent.button5);

              
            },

        },
        ending3: {
            x: width/4,
            y: height/2+300,
            message: "The Devil’s smile grows larger.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                   
                   
                    cleanup2();
                   
                    makeText(endingContent.ending03);



                }, 3000);
            },

        },
        ending03: {
            x: width/4,
            y: height/2+300,
            message: "He smirks, and disappears.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                   
                    mirrors.shift();
                    makeMirror(mirror.yourself_old, mirror.x, mirror.y, mirror.width, mirror.height, 0);
                    cleanup2();
                    setTimeout(() => {   makeText(endingContent.ending003);}, 3000);
                  

                }, 3000);
            },

        },
        ending003: {
            x: width/4,
            y: height/2+300,
            message: "You seem too have lost your vitality...",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                    makeButton(buttonContent.button5);
                }, 3000);
            },

        },
        ending4: {
            x: width/4,
            y: height/2+300,
            message: "'We will see eachother soon.'",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                   
                    mirrors.shift();
                makeMirror(mirror.yourself_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);
                    cleanup2();
                    makeText(endingContent.ending04);


                }, 3000);
            },

        },
        ending04: {
            x: width/4,
            y: height/2+300,
            message: "You feel uneasy...",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                   
                 
                    cleanup2();
                    makeText(endingContent.ending004);



                }, 3000);
            },

        },
        ending004: {
            x: width/4,
            y: height/2+300,
            message: "Something is behind you...",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                
                    makeMirror(mirror.devil_behind, mirror.x, mirror.y, mirror.width, mirror.height, 2);
                setTimeout(() => {
                   
                            
                   
                    setTimeout(() => {
                        
                            isRed = true;
                        },3000);

                        setTimeout(() => {
                        
                           isPlay = false;
                           isEnd = true;
                        },10000);
                   


                }, 3000);
            },
            scary: true

        },
        ending5: {
            x: width/4,
            y: height/2+300,
            message: "The Devil smiles.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                   
                    
                    makeMirror(mirror.cracked, mirror.x, mirror.y, mirror.width, mirror.height, 0);
                    cleanup2();
                    makeText(endingContent.ending05);


                }, 3000);
            },

        },
        ending05: {
            x: width/4,
            y: height/2+300,
            message: "Cracks are forming on the surface of your mirror...",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                mirrors.shift();
                mirrors.shift();
                makeMirror(mirror.devil_jumpscare, mirror.x, mirror.y, mirror.width, mirror.height, 2);
               setTimeout(() => {
               
               
                cleanup2();
              
                makeText(endingContent.ending005);
                isRed = true;
            },3000);

            },

        },
        ending005: {
            x: width/4,
            y: height/2+300,
            message: "Your time has run out...",
            size: 30,
            colour: 0,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
            },
            scary: true

        },
        ending7: {
            x: width/4,
            y: height/2+300,
            message: "Cracks are appearing on the mirror...",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                   
                    
            
                    cleanup2();
                    makeText(endingContent.ending07);


                }, 3000);
            },

        },
        ending07: {
            x: width/4,
            y: height/2+300,
            message: "You feel the Devil's presence getting stronger... You want to run away.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                makeButton(buttonContent.button6);
            },

        },
        ending007: {
            x: width/4,
            y: height/2+300,
            message: "You cannot escape...",
            size: 30,
            colour: 0,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
            
                setTimeout(() => {
                    endMessage = "Never spend more than three minutes with the Devil.";
                    isPlay = false;
                    isEnd = true;

                    
               

                }, 3000);
            },
            scary: true

        }
        
    }
    
    // data for the imposter ending
    impostorContent = {
        impostor1: {
            x: width/4,
            y: height/2+300,
            message: "You leave the mirror. However, your reflection remains still, looking at you.",
            size: 30,
            colour: red,
            align: CENTER,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                endMessage = "Only leave when it's your own reflection.";
                setTimeout(() => {
                    mirrors.shift();
                   
                    makeMirror(mirror.impostor_smile, mirror.x, mirror.y, mirror.width, mirror.height, 1);
                    setTimeout(() => {
                        cleanup2();
                    mirrors.shift();
                   
                    makeMirror(mirror.impostor_jumpscare, mirror.x, mirror.y, mirror.width, mirror.height, 2);
                        isRed = true;
                        setTimeout(()=>{  isEnd = true;
                            isPlay = false;}, 4000)
                       
                    },3000);



                }, 1500);
            },

        },
    }

    // unfortunetely , I didnt have time to include more dares:(
    dares = [
        dare1 = {
            x: width/4,
            y: height/2+300,
            message: "I dare you to cover your eyes for three seconds. Will you do it?",
            size: 30,
            colour: red,
            wiggle: 1,
            width: width/2,
            fonction: () => {
                command1 = {
                    "*answer": (answer) => {
                       
                        if(answer.toLowerCase() == "yes"){
                            endingBool.ending6 = true;
                            didDare = true;
                            ending();
                     
                         } else if(answer.toLowerCase() == "no"){

                            if(answerCount>=3){
                               
                                ending();

                            }else{
                                
                                chances = chances -1;
                                chances = constrain(chances, 0, 3);
                                cleanup2();
                                generateQuestion();
                                followUp = devilContent.text3;
                                makeText(devilContent.text1);
                            }
                           

                         }
                         annyang.removeCommands("*answer");
                    }
                };
                annyang.addCommands(command1);
                makeOption(optionsContent.option02);
               
            
            }
        }
    ];

    mirror.x = width/2;
    mirror.y = height/2 - 75;
    // start!
    // makeButton(buttonContent.button1);
    makeMirror(mirror.devil_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);

    makeText(devilContent.text2);
 
}



// controls the ending of the game
function ending(){
    
cleanup();
if(chances == 3 && answerCount>1 && didDare == false){
    endingBool.ending1 = true;
   
} else if((chances==2 || answerCount <= 1)&& endingBool.ending6 == false){
    endingBool.ending2 = true;
}else if(chances==1){
    endingBool.ending3 = true;
} else if(chances==0){
    endingBool.ending4 = true;
}

if(endingBool.ending1 == true){
   
    makeText(endingContent.ending1);
    endMessage = "You have gained the Devil's favour.";
} else if(endingBool.ending2 == true){
    
    makeText(endingContent.ending2)
    endMessage = "You have survived the encounter.";
} else if(endingBool.ending3 == true){
   
    makeText(endingContent.ending3)
    mirrors.shift();
    makeMirror(mirror.devil_smile, mirror.x, mirror.y, mirror.width, mirror.height, 0);
    endMessage = "You have survived, but at what cost...";

}else if(endingBool.ending4 == true){
   
    followUp = endingContent.ending4;
    makeText(devilContent.text1);
    endMessage = "Best to prepare before challenging the Devil.";
}else if(endingBool.ending5 == true){
   
    
    makeText(endingContent.ending5);
    mirrors.shift();
    makeMirror(mirror.devil_smile, mirror.x, mirror.y, mirror.width, mirror.height, 0);
    endMessage = "Do not spend more than 3 minutes with the Devil.";
} else if(endingBool.ending6 == true){
    mirrors.shift();
    endMessage = "Never let the devil out of sight.";
    setTimeout(()=>{  makeMirror(mirror.devil_jumpscare, mirror.x, mirror.y, mirror.width, mirror.height, 0);}, 5000);
    setTimeout(()=>{   isRed=true;}, 7000);
    setTimeout(()=>{   isPlay = false;
    isEnd = true;}, 12000);

   

   
}
console.log(endingBool);

}

// picks a new question from the riddle array
function generateQuestion(){
    let question = Math.floor(Math.random() * riddlesContent.length);
    devilContent.text3.message = riddlesContent[question].question;
    devilContent.text3.answer = riddlesContent[question].answer;
    riddlesContent.splice(question, 1);

}

// removes text from screen
function cleanup(){
    texts.shift(); 
    options.shift();
    annyang.pause();
    annyang.removeCommands("*answer");
}

// same but doesnt pause annyang
function cleanup2(){
    texts.shift(); 
    options.shift();
    annyang.removeCommands("*answer");
}

// responds to a yes / no question
function yesNo(answer){
    if(answer == "yes"){
       texts[0].yes();
    } else if(answer == "no"){
        texts[0].no();
    }
}

// determines whether the user has summoned the devil
function counted(answer){
    if(answer == "7 6 5 4 3 2 1" || answer == "won" || answer == "7 6 5 4 3 2 1 0"){
        cleanup();
        isTime = true;

        mirrors.shift();
        followUp = devilContent.text2;
        makeMirror(mirror.devil_normal, mirror.x, mirror.y, mirror.width, mirror.height, 0);
        isTime = true;
        setTimeout(() => makeText(devilContent.text1), 2000);
    } 

}

// :)
function draw() {
    background(bgColour,0,0);
   
    // this will activate depending on the ending
    if(isPlay) {
        if(isRed == true){
            makeRed();
        }
        userInterface();
        runObjects();
       
        if(isTimeUp== false){
            decreaseTimer();
        }

    }
    if(isEnd){
     push();
     textAlign(CENTER);
     textSize(60);
     fill(255);
     text("THE END",width/2, height/2-50);
      textAlign(CENTER);
      textSize(30);
      text(endMessage,width/2, height/2+100);
      pop();
    }
}



