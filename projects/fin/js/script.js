// variables
let red = "#C70025";
let black = "#121420";
let white = "#F2F4F3";

// Mission progress.
let stage = 1;

// Giving player his starting properties.
let player = {
    health: 50,
    max_health: 50,
    strength: 0,
    dexterity: 0,
    weak: 0,
    vulnerable: 0,
    block: 0,
    max_energy: 3,
    energy: 3,
    draw: 3,
    artifacts: 0,
    poisoned: 0,
};
let weak_modifier = 0.75;
let vulnerable_modifier = 1.5;
// Classical enemy object properties.

// My arrays.
let permanent_deck = [];
let temporary_deck = [];
let discard_pile = [];
let active_cards = [];

// Creates an example deck.
permanent_deck.push(cards[9]);
permanent_deck.push(cards[9]);
permanent_deck.push(cards[10]);
permanent_deck.push(cards[10]);
permanent_deck.push(cards[11]);
permanent_deck.push(cards[11]);
console.log(permanent_deck);    


let hasGenerated = false;
let cardCount;
let intentNumber;

// Initilatizing an enemmy.
// Initializing a scene.
start_combat(enemies[2]);

function enemy_damage_calc(damage){
    if(current_ennemy.weak > 0){
      damage = Math.floor(damage*weak_modifier);
    }
    if(player.vulnerable > 0){
      damage = Math.floor(damage*vulnerable_modifier);
    }
    
    return damage;
}
function ennemy_attack(){ 
    $(".SC_main_text").text(current_ennemy.attack_phrase[1]);
    $(".SC_continue").hide();
    setTimeout(()=>{
        attack("player", current_ennemy.attack_damage);
        update_UI();  
        setTimeout(()=>{
            $(".SC_continue").show();
            end_enemy_turn();
        }, 1000);
    }, 2000)
}
function enemy_defend(){
    $(".SC_main_text").text(current_ennemy.defend_phrase[1]);
    $(".SC_continue").hide();
    setTimeout(()=>{
        current_ennemy.block += 8;
        update_UI();  
        setTimeout(()=>{
            $(".SC_continue").show();
            end_enemy_turn();
        }, 1000);
    }, 2000)
}

function block_calc(target, number){
    if(target.block == 0){
        target.health =  target.health - number;
    }
    if(target.block > 0){
        target.block = target.block - number;
        if(target.block < 0){
            let temp_block = target.block* -1;
            target.health =  target.health - temp_block;
            target.block = 0;
        }
    } 
}
function end_enemy_turn(){
    if(current_ennemy.weak > 0){
        current_ennemy.weak -= 1;
    }
    if(current_ennemy.vulnerable > 0){
        current_ennemy.vulnerable -= 1;
    }
    update_UI();
    start_turn()
}
// make_hoverable(".SC_draw_pile", "hello");
function make_hoverable(className, text){
    $( className ).mouseenter(function() {
        
        $(".SC_description_box").text(text);
        $(".SC_description_box").show();
      }).mousemove(function( event ) {
        
        if($(className).is(":visible")){
            $(".SC_description_box").css( 'top', event.pageY -100);
            $(".SC_description_box").css( 'left', event.pageX );
        }else{
           
            $(".SC_description_box").hide();
        }
    }).mouseleave(function() {
        $(".SC_description_box").hide();
      });

}



// $( "#dialog" ).dialog();

// This function will be called at the start of every combat.
function start_combat(enemy){
    current_ennemy = enemy;
    temporary_deck = [];
    discard_pile = [];
    active_cards = [];
    // player.strength = 0;
    // player.dexterity = 0;
    // copy the player's permanent deck. The temporary deck will change length and order throughout the combat.
    temporary_deck = permanent_deck.slice();
    $(".SC_enemy_sprite img").attr("src", current_ennemy.source);
    $(".SC_main_text").text(current_ennemy.intro);
    // shuffle the deck of course
    shuffleDeck(temporary_deck);
    // calls start of turn function (defined later)
    
    
    // allows player to view his deck
    $( ".SC_view_deck" ).click(function() {
        $( ".SC_view_deck_full" ).toggle();
    });
    // allows player to view his draw pile (cards he has not yet drawn)
    $( ".SC_draw_pile" ).click(function() {
        $( ".SC_draw_pile_full" ).toggle();
    });
    // allows player to view his discard pile (cards that he played)
    $( ".SC_discard_pile" ).click(function() {
        $( ".SC_discard_pile_full" ).toggle();
    });
    // creates permanent deck list
    $(permanent_deck).each(function( index ) {
        $(".SC_view_deck_full ul").append("<li>- "+permanent_deck[index].name+"</li>");
    });
    $(".SC_player_status").mouseenter( ()=>{  $(".SC_player_status_window").show()} ).mouseleave( ()=>{  $(".SC_player_status_window").hide()} );
    $(".SC_enemy_status").mouseenter( ()=>{  $(".SC_enemy_status_window").show()} ).mouseleave( ()=>{  $(".SC_enemy_status_window").hide()} );
    setTimeout(scene_transition, 1000);
    // updates the user interface (defined later)
    update_UI();    
    
}

// This function will be called at the player's start of turn 
function start_turn(){
    
    player.block = 0;
    player.energy = player.max_energy;
    $(".SC_end_button").mouseenter( ()=>{   $(".SC_end_button").css("background-color", "var(--red)")} ).mouseleave( ()=>{   $(".SC_end_button").css("background-color", "var(--black)")} );
    enemy_intent();
    $(".SC_main_overlay").on("click",()=>{   
        $(".SC_turn").text("YOUR TURN");
        $(this).off();
        $(".SC_turn").fadeIn(1000, ()=>{
            $(".SC_turn").fadeOut();
        });
        $(".SC_main_overlay").fadeOut();
    });
    generate_cards();
    $(".SC_end_button").on("click", ()=>{
        $(".SC_end_button").off();
        end_turn();
        
    });
    update_UI();
}

function enemy_intent(){
    intentNumber = getRandomIntInclusive(0, current_ennemy.intent_choices.length);
    current_ennemy.intent =  current_ennemy.intent_choices[intentNumber];
    // current_ennemy.intent = "buff";
    
    switch (current_ennemy.intent) {
        case "attack":
            $(".SC_main_text").text(current_ennemy.attack_phrase[0]);
          break;
        case "defend":
            $(".SC_main_text").text(current_ennemy.defend_phrase[0]);

          break;
        case "buff":
            $(".SC_main_text").text(current_ennemy.buff_phrase[0]);

          break;
        case "debuff":
            $(".SC_main_text").text(current_ennemy.debuff_phrase[0]);
          break;
        default:
            $(".SC_main_text").text("The ennemy is staring at you.");
      }
}

// This function serves to update the user interface as soon as there are any changes. It will be called quite often.
function update_UI(){
    $(".SC_enemy_health p").text(current_ennemy.name + ": "+ current_ennemy.health);
    $(".SC_player_health p").text("Health: "+ player.health);
    $(".SC_player_energy p").text("Energy: "+ player.energy);
    $(".SC_player_artifacts p").text("Artifacts("+ player.artifacts+")");
    $(".SC_draw_pile p").text("Draw("+ (temporary_deck.length)+")");
    $(".SC_discard_pile p").text("Discard("+ (discard_pile.length)+")");
    $(".SC_player_block h3").text(player.block);
    $(".SC_enemy_block h3").text(current_ennemy.block);
    if(cardCount == 0){
        $(".SC_end_button").css("background-color", "green");
    } else{
        $(".SC_end_button").css("background-color", "var(--black)");
    }
    // creates draw & discard pile list
    $(".SC_draw_pile_full ul").empty();
    $(".SC_discard_pile_full ul").empty();
    $(temporary_deck).each(function( index ) {
        $(".SC_draw_pile_full ul").append("<li>- "+temporary_deck[index].name+"</li>");
        make_hoverable(".SC_draw_pile_full ul li:eq("+index+")", temporary_deck[index].description)
    });
    $(discard_pile).each(function( index ) {
        $(".SC_discard_pile_full ul").append("<li>- "+discard_pile[index].name+"</li>");
        make_hoverable(".SC_discard_pile_full ul li:eq("+index+")", discard_pile[index].description)
    });
    UI_block_check();
    UI_health_check();
    UI_status_check();
    strength_check();
    check_end_combat();
}
function strength_check(){
    if(player.strength>0 || player.dexterity > 0){
        cards[0].description = "Deal "+ (cards[0].base_damage + player.strength) +" damage.";
        cards[1].description = "Gain "+(cards[1].base_block+ player.dexterity)+" block."
        cards[2].description = "Deal "+ (cards[2].base_damage+ player.strength) +" damage. Gain "+(cards[2].base_block+ player.dexterity)+" block. Apply 1 weak to your enemy.";
        cards[5].description = "Deal "+ (cards[5].base_damage+ player.strength) +" damage twice.";
        cards[6].description = "Deal "+ (cards[6].base_damage+ player.strength) +" damage. Apply 1 weak and 1 vulnerable to your enemy.";
        cards[7].description = "Deal "+ (cards[7].base_damage+ player.strength) +" damage. If your opponent is affected by status, deal 5 more.";
        cards[8].description = "Gain "+(cards[8].base_block+ player.dexterity)+" block.";
        cards[9].description = "Gain "+(cards[9].base_block+ player.dexterity)+" block. Inflict 2 weak on your enemy.";
        cards[10].description = "Gain "+(cards[10].base_block+ player.dexterity)+" block. Deal "+ (cards[10].base_damage+ player.strength) +" damage. Cleanse your status.";


    } 
}

function UI_block_check(){
    if(player.block == 0){
        $(".SC_player_block").hide();
    } else {
        $(".SC_player_block").fadeIn();
    }
    if(current_ennemy.block == 0){
        $(".SC_enemy_block").hide();
    } else {
        $(".SC_enemy_block").fadeIn();
    }
}
function UI_status_check(){
    $(".SC_player_status_window").empty();
    if(player.weak > 0){
        $(".SC_player_status").css("display", "flex");
        $(".SC_player_status_window").append("<p>You are weak. This means you deal 25% less damage. <br>(Turns remaining: "+player.weak+")</p>");
    }
    if(player.vulnerable > 0){
        $(".SC_player_status").css("display", "flex");
        $(".SC_player_status_window").append(" <p>You are vulnerable. This means you take 50% more damage. <br>(Turns remaining: "+player.vulnerable+")</p>");
    }
    if(player.weak == 0 && player.vulnerable ==0){
        $(".SC_enemy_status").hide();
    }
    $(".SC_enemy_status_window").empty();
    if(current_ennemy.weak > 0){
        $(".SC_enemy_status").css("display", "flex");
        $(".SC_enemy_status_window").append("<p>Your enemy is weak. It will deal 25% less damage. <br>(Turns remaining: "+current_ennemy.weak+")</p>");
    } 
    if(current_ennemy.vulnerable > 0){
        $(".SC_enemy_status").css("display", "flex");
        $(".SC_enemy_status_window").append(" <p>Your enemy is vulnerable. It will take 50% more damage. <br>(Turns remaining: "+current_ennemy.vulnerable+")</p>");
    }
    if(current_ennemy.weak == 0 && current_ennemy.vulnerable == 0){
        $(".SC_enemy_status").hide();
    }
}

function UI_health_check(){
    //player health bar calc
    let health_percent = (player.health / player.max_health)*100;
    $(".SC_health_bar").css("width", health_percent +"%");

    //energy bar calculator
    let energy_percent = (player.energy / player.max_energy)*100;;
    $(".SC_energy_bar").css("width", energy_percent +"%");

    //enemy health bar calc
    let enemy_percent = (current_ennemy.health / current_ennemy.max_health)*100;;
    $(".SC_enemy_bar").css("width", enemy_percent +"%");
}
let used_cards = [];
// This function will generate cards for the user to play.
function generate_cards(){
    for (let i = 0; i < player.draw; i++) {
        // create a new array of active cards
        active_cards.push(temporary_deck[0]);
        // create cards in HTML
        $( ".SC_main_box" ).append( "<div class='card'><p>"+ active_cards[i].name+ "</p> <img src='"+ active_cards[i].image +"'><p>"+ active_cards[i].energy+"</p></div>" );
        // activate event listeners on cards
        make_hoverable(".card:eq("+ i +")", active_cards[i].description);
        $( ".card:eq("+ i +")" ).on( "click", function() {
            active_cards[i].effect(current_ennemy);
            player.energy -= active_cards[i].energy;
            $(this).fadeOut();
            discard_pile.push(active_cards[i]);
            used_cards.push(i);
            cardCount = cardCount - 1;
            update_UI();
            $(this).off();
            setTimeout(()=>{
                $(".SC_description_box").fadeOut();
        },500)
          });
        temporary_deck.shift();
        check_reshuffle();
    }
    cardCount = active_cards.length;
    hasGenerated = true;
   
}
// Comming soon!
function end_turn(){
    // reset active cards, reset ennemies status
    cardCount = 1;
    $(".SC_turn").text("ENEMY TURN");
    $(".SC_turn").fadeIn(1000, ()=>{
        $(".SC_turn").fadeOut();
        $(".SC_main_overlay").fadeIn();
        enemy_turn();
    });
    let skip=false;
    for (let i = 0; i < active_cards.length; i++) {
        skip= false;
       for (let e = 0; e < used_cards.length; e++) {
           if(used_cards[e] == i){
               skip = true;
           }
       }
       if(skip== true){
        continue;
       } else{
        discard_pile.push(active_cards[i]);
       }
    }
    //reset stats
    hasGenerated = false;
    active_cards = [];
    $("div.card").remove();
    $(".SC_end_button").css("background-color", "#121420");
    if(player.weak >0){
        player.weak -= 1;
    }
    if(player.vulnerable >0){
        player.vulnerable -= 1;
    }
    if(player.poisoned > 0){
        status_marker("player", ["-2", "Poisoned"])
        block_calc(player, player.poisoned);
    }
    update_UI();
}

function damage_marker(target, damage){
    if(target == "player"){
        $(".SC_player_damage_marker").text("-"+damage);
        $(".SC_player_damage_marker").fadeIn(1000, ()=>{
        $(".SC_player_damage_marker").fadeOut();
    });
    }
    if(target == "enemy"){
        $(".SC_enemy_damage_marker").text("-"+damage);
        $(".SC_enemy_damage_marker").fadeIn(1000, ()=>{
        $(".SC_enemy_damage_marker").fadeOut();
    });
    }
    

}
function status_marker(target, status){
    if(target == "player"){
        if(status.length == 1){
        $(".SC_player_status_marker").text(status[0]);
        $(".SC_player_status_marker").fadeIn(1000, ()=>{
        $(".SC_player_status_marker").fadeOut();
    });
    } else if(status.length > 1){
        // alert()
        $(".SC_player_status_marker").text(status[0]);
        $(".SC_player_status_marker").fadeIn(1000, ()=>{
        $(".SC_player_status_marker").fadeOut("slow", ()=>{
            $(".SC_player_status_marker").text(status[1]);
        $(".SC_player_status_marker").fadeIn(1000, ()=>{
        $(".SC_player_status_marker").fadeOut();
    }); 
    });
    });
        }
        
    }
    if(target == "enemy"){
        if(status.length == 1){
        $(".SC_enemy_status_marker").text(status[0]);
        $(".SC_enemy_status_marker").fadeIn(1000, ()=>{
        $(".SC_enemy_status_marker").fadeOut();
    });
    } else if(status.length > 1){
        // alert()
        $(".SC_enemy_status_marker").text(status[0]);
        $(".SC_enemy_status_marker").fadeIn(1000, ()=>{
        $(".SC_enemy_status_marker").fadeOut("slow", ()=>{
            $(".SC_enemy_status_marker").text(status[1]);
        $(".SC_enemy_status_marker").fadeIn(1000, ()=>{
        $(".SC_enemy_status_marker").fadeOut();
    }); 
    });
    });
        }
        
    }
   
    
}
function enemy_turn(){
    current_ennemy.block = 0;
    switch (current_ennemy.intent) {
        case "attack":
            current_ennemy.attack();
            
          break;
        case "defend":
            current_ennemy.defend();

          break;
        case "buff":
            current_ennemy.buff();

          break;
        case "debuff":
            current_ennemy.debuff();
          break;
        default:
            alert("error-enemy_turn()");
      }
}
function check_reshuffle(){
    if(temporary_deck.length == 0){
    temporary_deck = permanent_deck.slice();
    discard_pile = [];
    shuffleDeck(temporary_deck);
    update_UI();
    } 
}

function display_overlay(){

}

function scene_transition(){
    if(current_ennemy.name == "Slenderman"){
        $( ".TR" ).fadeOut(2000, ()=>{
       

            $(".SC_main_overlay").on("click", ()=>{
                $(".SC_main_text").text(current_ennemy.intro2);
                $(".SC_main_overlay").on("click", ()=>{
                    
                    $(".SC_main_overlay").off();
                    start_turn();
                   
                });
    
              
               
            });
    
       
    });
    } else{
        $( ".TR" ).fadeOut(2000, ()=>{

            $(".SC_main_overlay").on("click", ()=>{
                $(".SC_main_overlay").off();
                start_turn();
               
            });

       
    });
    }
    
    

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
// Shuffles an array - the deck in our case.
function shuffleDeck(array) {
    array = array.sort(() => Math.random() - 0.5)
 }
 function check_end_combat(){
    if(current_ennemy.health <= 0){
        setTimeout(()=>{

            $(".SC_enemy_sprite").fadeOut("slow", ()=>{
                $(".SC").fadeOut("slow", ()=>{
                    $(".VT").fadeIn();
                });
                
            });

        }, 1000);
       
    }
 }
 
function attack(target, number){
    let damage;
    if(target == "enemy"){
      damage = player_damage_calc(number);
      damage_marker(target, damage);
    block_calc(current_ennemy, damage);
    } 
    if(target == "player"){
      damage = enemy_damage_calc(number);
      damage_marker(target, damage);
      block_calc(player, damage);  
      
    }
    
   
  }
  function player_damage_calc(damage){
  
    if(player.weak > 0){
      damage = Math.floor(damage*weak_modifier);
    }
    if(current_ennemy.vulnerable > 0){
      damage = Math.floor(damage*vulnerable_modifier);
    }
    return damage;
  }
  
  function draw_card(number){
    for (let i = 0; i < number; i++) {
      
      let new_card = temporary_deck[0];
    active_cards.push(temporary_deck[0]);
    $( ".SC_main_box" ).append( "<div class='card'><p>"+ new_card.name+ "</p> <img src='"+ new_card.image +"'><p>"+ new_card.energy+"</p></div>" );
    make_hoverable(".card:eq("+ (active_cards.length-1) +")", active_cards[active_cards.length-1].description);
    $( ".card:eq("+ (active_cards.length-1) +")" ).on( "click", function() {
        new_card.effect(current_ennemy);
        player.energy -= new_card.energy;
        $(this).fadeOut();
        discard_pile.push(new_card);
        cardCount = cardCount - 1;
        update_UI();
        $(this).off();
      });
    temporary_deck.shift();
    cardCount+=1;
    check_reshuffle();
    }
    
  }









