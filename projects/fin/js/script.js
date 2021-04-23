// constant variables
const red = "#C70025";
const black = "#121420";
const white = "#F2F4F3";
const weak_modifier = 0.75;
const vulnerable_modifier = 1.5;

// Mission progress.
let stage = 0;

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
    draw: 4,
    artifacts: 0,
    poisoned: 0,
};

// My arrays.
let permanent_deck = [];
let temporary_deck = [];
let discard_pile = [];
let active_cards = [];
let used_cards = [];

// Creates a starting deck.
permanent_deck.push(cards[0]);
permanent_deck.push(cards[0]);
permanent_deck.push(cards[0]);
permanent_deck.push(cards[1]);
permanent_deck.push(cards[1]);
permanent_deck.push(cards[1]);
permanent_deck.push(cards[2]);
permanent_deck.push(cards[11]);

// combat variables
let hasGenerated = false;
let cardCount;
let intentNumber;

// Initializing the game.
$(".intro").on("click", function(){
    transition(".intro", ".PG", "flex");
    mission_progress();
});

// ================================================ NON-COMBAT FUNCTIONS =================================================================
// transition(): hides one scene, displays another.
function transition(scene1, scene2, display){
    $(scene1).fadeOut(1000, ()=>{
        $(scene2)
    .css("display", display)
    .hide()
    .fadeIn();
    })
}
// generate_rewards(): once the player wins a fight, he may choose one card to add to his deck.
function generate_rewards(){
    let count = 0;
    let choice;
    let choices = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let new_cards = [];
    // generates a non-repeating sequence of numbers
    while(count<3){
       choice = Math.floor(Math.random() * (choices.length));
       new_cards.push(choices[choice])
       choices.splice(choice,1);
       count++;
    }
    // create the cards on the page
    for (let i = 0; i < 3; i++) {
        let chosen = cards[new_cards[i]];
        make_hoverable(".VT_new_card:eq("+i+")", chosen.description);
        $( ".VT_new_card:eq("+ i +")" ).
        html('<p>'+chosen.name+'</p><img src="'+chosen.image+'" width="100px" height="100px" alt=""><p>'+chosen.energy+'</p>').
        mouseover(function() {
            $(this).css("background-color", "var(--red)");
        }).
        mouseleave(function() {
            $(this).css("background-color", "var(--black)");
        }).
        on( "click", function() {
            permanent_deck.push(chosen);
            for (let i = 0; i < 3; i++){
                $( ".VT_new_card:eq("+ i +")" ).css("background-color", "var(--black)").off();  
            }
            $(this).fadeOut();
            setTimeout(()=>{
                transition(".VT", ".PG", "flex");
                mission_progress();
            }, 1000);
            setTimeout(()=>{
                $(".SC_description_box").fadeOut();
            },500);
        }).css({"display":"flex"}, {"background-color": "var(--black)"});
    }
}
// mission_progress(): indicates the player's progress. Serves as a transition scene.
function mission_progress(){
    let bar;
    switch(stage) {
        case 0:
          bar = "25%";
          break;
        case 1:
           bar = "50%";
          break;
        case 2:
            bar = "75%";
            break;
        case 3:
             bar = "100%";
            break;
        default:
          alert("done");
      }
    setTimeout(()=>{
        $(".PG_progress_bar").css("width", bar);
    }, 2000);
    setTimeout(()=>{
        transition(".PG", ".SC", "grid");
        start_combat(enemies[stage]);
    }, 5000);
}
// ================================================== UI ===================================================================
// update_UI(): checks changes in the code to update the user interface.
function update_UI(){
    // making sure the front end matches the back end
    $(".SC_enemy_health p").text(current_ennemy.name + ": "+ current_ennemy.health);
    $(".SC_player_health p").text("Health: "+ player.health);
    $(".SC_player_energy p").text("Energy: "+ player.energy);
    $(".SC_player_artifacts p").text("Artifacts("+ player.artifacts+")");
    $(".SC_draw_pile p").text("Draw("+ (temporary_deck.length)+")");
    $(".SC_discard_pile p").text("Discard("+ (discard_pile.length)+")");
    $(".SC_player_block h3").text(player.block);
    $(".SC_enemy_block h3").text(current_ennemy.block);
    // if player has no more actions, the end-turn will be highlighted
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
        make_hoverable(".SC_draw_pile_full ul li:eq("+index+")", temporary_deck[index].description);
    });
    $(discard_pile).each(function( index ) {
        $(".SC_discard_pile_full ul").append("<li>- "+discard_pile[index].name+"</li>");
        make_hoverable(".SC_discard_pile_full ul li:eq("+index+")", discard_pile[index].description);
    });
    // checks for the need of additional visual queues
    UI_block_check();
    UI_health_check();
    UI_status_check();
    strength_check();
    // checks if the player or enemy dead
    check_end_combat();
}
// damage_marker(): visible queue for when a character takes damage.
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
// status_marker(): visible queue for changes in status conditions.
function status_marker(target, status){
    // creates a display method for when a character is affected by one / more than one status condition
    if(target == "player"){
        if(status.length == 1){
        $(".SC_player_status_marker").text(status[0]);
        $(".SC_player_status_marker").fadeIn(1000, ()=>{
        $(".SC_player_status_marker").fadeOut();
    });
    } else if(status.length > 1){
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
// make_hoverable(): gives an element a description box on hover.
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
// strength_check(): adjusts card descriptions depending on strength / dexterity modifiers
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
// block_check(): verifies if the player / enemy has any block.
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
// UI_status_check(): verifies if the player / enemy is vulnerable / weak.
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
        $(".SC_player_status").hide();
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
// UI_health_check(): adjusts the player's and the enemy's health bar + player energy bar.
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
// check_end_combat(): checks if the enemy is dead or the player is dead.
function check_end_combat(){
    // if the player beats the last boss Slenderman, he wins.
    if(current_ennemy.name == "Slenderman" && current_ennemy.health <= 0){ 
        transition(".SC", ".END", "flex");   
    } else if(current_ennemy.health <= 0){
        $( ".SC_view_deck" ).off();
                    // allows player to view his draw pile (cards he has not yet drawn)
                    $( ".SC_draw_pile" ).off();
                    // allows player to view his discard pile (cards that he played)
                    $( ".SC_discard_pile" ).off();
                    $(".SC_end_button").off();
                    $(".SC_player_status").off();
                    $(".SC_enemy_status").off();
        setTimeout(()=>{
            $(".SC_enemy_sprite img").fadeOut("slow", ()=>{
                $(".SC").fadeOut(1000, ()=>{
                    stage+= 1;                   
                    generate_rewards();
                    transition(".SC", ".VT", "grid");
                });
            });
        }, 1000);
    }
    if(player.health <= 0){
        $(".END").text("You have been defeated.").css("background-color", "var(--red)");
        transition(".SC", ".END", "flex");
    }
}
// scene_transition(): enemy introduction in the start_combat() function
function scene_transition(){
    // special intro for the last boss
    if(current_ennemy.name == "Slenderman"){
        $(".SC_main_overlay").on("click", ()=>{
            $(".SC_main_text").text(current_ennemy.intro2);
            $(".SC_main_overlay").on("click", ()=>{
                $(".SC_main_overlay").off();
                start_turn(); 
            });
        });
    } else{
        $(".SC_main_overlay").on("click", ()=>{
            $(".SC_main_overlay").off();
            start_turn();
        });
    }
}
//  ============================================== COMBAT: PLAYER TURN ===============================================================
// start_combat(): initiates all listeners and variables needed for combat
function start_combat(enemy){
    console.log(stage);
    // reset all elements
    current_ennemy = enemy;
    $(".SC_draw_pile_full ul").empty();
    $(".SC_discard_pile_full ul").empty();
    $(".SC_main_overlay").css("display", "flex");
    temporary_deck = [];
    discard_pile = [];
    active_cards = [];
    player.strength = 0;
    player.dexterity = 0;
    player.poisoned = 0;
    player.energy = player.max_energy;
    player.health = player.max_health;
    $("div.card").remove();
    hasGenerated = false;
    active_cards = [];
    // copy the player's permanent deck. The temporary deck will change length and order throughout the combat.
    temporary_deck = permanent_deck.slice();
    $(".SC_enemy_sprite img").attr("src", current_ennemy.source).css("display", "block");
    $(".SC_main_text").text(current_ennemy.intro);
    // shuffles the deck.
    shuffleDeck(temporary_deck);    
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
    $(".SC_view_deck_full ul").empty();
    $(permanent_deck).each(function( index ) {
        $(".SC_view_deck_full ul").append("<li>- "+permanent_deck[index].name+"</li>");
    });
    // creates interactive status window
    $(".SC_player_status").mouseenter( ()=>{  $(".SC_player_status_window").show()} ).mouseleave( ()=>{  $(".SC_player_status_window").hide()} );
    $(".SC_enemy_status").mouseenter( ()=>{  $(".SC_enemy_status_window").show()} ).mouseleave( ()=>{  $(".SC_enemy_status_window").hide()} );
    // starts of the players turn
    setTimeout(scene_transition, 1000);
    // updates the user interface 
    update_UI();    
}
// start_turn(): resets block and energy. Declares enemy intent. Generates cards.
function start_turn(){
    player.block = 0;
    player.energy = player.max_energy;
    // interactive end button
    $(".SC_end_button").mouseenter( ()=>{   $(".SC_end_button").css("background-color", "var(--red)")} ).mouseleave( ()=>{   $(".SC_end_button").css("background-color", "var(--black)")} );
    // sets enemy action
    enemy_intent();
    // allows the player to play once the intent has been confirmed.
    $(".SC_main_overlay").on("click",()=>{   
        $(".SC_turn").text("YOUR TURN");
        $(".SC_main_overlay").off();
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
// generate_cards(): every turn, generates cards for the player. Possibly the hardest function...
function generate_cards(){
    for (let i = 0; i < player.draw; i++) {
        // create a new array of active cards
        active_cards.push(temporary_deck[0]);
        // create cards in HTML
        $( ".SC_main_box" ).append( "<div class='card'><p>"+ active_cards[i].name+ "</p> <img src='"+ active_cards[i].image +"'><p>"+ active_cards[i].energy+"</p></div>" );
        // make the cards hoverable
        make_hoverable(".card:eq("+ i +")", active_cards[i].description);
        // activate event listeners on cards
        $( ".card:eq("+ i +")" ).on( "click", function() {
            // player cannot play if he does not have enough energy
            if(active_cards[i].energy > player.energy){
                status_marker("player", ["Not Enough Energy"]);
            } else{
                active_cards[i].effect(current_ennemy);
                player.energy -= active_cards[i].energy;
                $(this).fadeOut();
                discard_pile.push(active_cards[i]);
                used_cards.push(i);
                cardCount = cardCount - 1;
                update_UI();
                $(".card:eq("+ i +")").off();
                setTimeout(()=>{
                    $(".SC_description_box").fadeOut();
                },500);
            }
          });
        temporary_deck.shift();
        check_reshuffle();
    }
    cardCount = active_cards.length;
    hasGenerated = true;
}
// =============================================== COMBAT: ENEMY ===============================================
// enemy_intent(): chooses an enemy intent depending on it's available actions.
function enemy_intent(){
    intentNumber = getRandomIntInclusive(0, current_ennemy.intent_choices.length);
    current_ennemy.intent =  current_ennemy.intent_choices[intentNumber];
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
// enemy_turn(): enemy acts based on it's intent.
function enemy_turn(){
    if(current_ennemy.name == "Slenderman"){
        status_marker("enemy", ["Strength Up"]);
        current_ennemy.attack_damage+= 1;
    }
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
// ennemy_attack(): called when the enemy is attacking. Deals damage while providing a description of the enemy's attack.
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
// enemy_defend(): called when the enemy defends. Enemy gains aa certain amount of block.
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
// end_enemy_turn(): ends the enemy's turn. Reduces all status by one.
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
// ================================================ CALCULATION FUNCTIONS =====================================================
// getRandomIntInclusive(): simply generates a random number between two numbers.
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
// shuffleDeck(): Shuffles an array - the deck in our case.
function shuffleDeck(array) {
    array = array.sort(() => Math.random() - 0.5)
}
// player_damage_calc(): calculates damage based on player's status.
function player_damage_calc(damage){
    if(player.weak > 0){
      damage = Math.floor(damage*weak_modifier);
    }
    if(current_ennemy.vulnerable > 0){
      damage = Math.floor(damage*vulnerable_modifier);
    }
    return damage;
}
// block_calc(): calculates total damage on block and on health for both player and enemy.
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
// enemy_damage_calc(): calculates damage based on enemy's status.
function enemy_damage_calc(damage){
    if(current_ennemy.weak > 0){
      damage = Math.floor(damage*weak_modifier);
    }
    if(player.vulnerable > 0){
      damage = Math.floor(damage*vulnerable_modifier);
    }
    
    return damage;
}
// check_reshuffle(): if the deck is empty, reshuffles it.
function check_reshuffle(){
    if(temporary_deck.length == 0){
    temporary_deck = permanent_deck.slice();
    discard_pile = [];
    shuffleDeck(temporary_deck);
    update_UI();
    } 
}
// =============================================== ACTIONS ===============================================================================
// attack(): selects target to attack. Takes into account status and block.
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
// draw_card(): extremely long function to draw a card. Basically generate_cards(), but called once.
function draw_card(number){
    for (let i = 0; i < number; i++) {
      let new_card = temporary_deck[0];
    active_cards.push(temporary_deck[0]);
    $( ".SC_main_box" ).append( "<div class='card'><p>"+ new_card.name+ "</p> <img src='"+ new_card.image +"'><p>"+ new_card.energy+"</p></div>" );
    make_hoverable(".card:eq("+ (active_cards.length-1) +")", active_cards[active_cards.length-1].description);
    $( ".card:eq("+ (active_cards.length-1) +")" ).on( "click", function() {
        if(active_cards[active_cards.length-1].energy > player.energy){
            status_marker("player", ["Not Enough Energy"]);
        } else{
            new_card.effect(current_ennemy);
            player.energy -= new_card.energy;
            $(this).fadeOut();
            discard_pile.push(new_card);
            cardCount = cardCount - 1;
            update_UI();
            $(this).off();
        }
      });
    temporary_deck.shift();
    cardCount+=1;
    check_reshuffle();
    }
}
// end_turn(): once player is done, he must end his turn. This discards all his active cards, and starts enemy turn.
function end_turn(){
    // enemy turn indicator
    $(".SC_turn").text("ENEMY TURN");
    $(".SC_turn").fadeIn(1000, ()=>{
        $(".SC_turn").fadeOut();
        $(".SC_main_overlay").fadeIn();
        enemy_turn();
    });
    // discards active cards
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
    $(".SC_end_button").css("background-color", "var(--black)");
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








