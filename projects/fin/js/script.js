// variables
let red = "#C70025";
let black = "#121420";
let white = "#F2F4F3";

// Mission progress.
let stage = 1;

// Giving player his starting properties.
let player = {
    health: 50,
    strength: 0,
    dexterity: 0,
    block: 0,
    energy: 3,
    draw: 3,
    artifacts: 0,
    gold: 100,
};

// Classical enemy object properties.
let ennemy_Brahms = {
    name: "Brahms",
    health: 20 * stage,
    deck: undefined,
    intent: undefined
}

// My arrays.
let permanent_deck = [];
let temporary_deck = [];
let discard_pile = [];
let active_cards = [];

// Creates an example deck.
permanent_deck.push(card_1);
permanent_deck.push(card_2);
permanent_deck.push(card_3);
permanent_deck.push(card_1);
permanent_deck.push(card_2);
permanent_deck.push(card_3);

// Initilatizing an enemmy.
let current_ennemy = ennemy_Brahms;
// Initializing a scene.
start_combat();

$( "#dialog" ).dialog();

// This function will be called at the start of every combat.
function start_combat(){
    // copy the player's permanent deck. The temporary deck will change length and order throughout the combat.
    temporary_deck = permanent_deck.slice();
    // shuffle the deck of course
    shuffleDeck(temporary_deck);
    // calls start of turn function (defined later)
    start_turn();
    // updates the user interface (defined later)
    update_UI();    
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
    
}

// This function will be called at the player's start of turn 
function start_turn(){
    generate_cards();
}

// This function serves to update the user interface as soon as there are any changes. It will be called quite often.
function update_UI(){
    $(".SC_enemy_health p").text(current_ennemy.name + ": "+ current_ennemy.health);
    $(".SC_player_health p").text("Health: "+ player.health);
    $(".SC_player_energy p").text("Energy: "+ player.energy);
    $(".SC_player_artifacts p").text("Artifacts("+ player.artifacts+")");
    $(".SC_draw_pile p").text("Draw("+ (temporary_deck.length)+")");
    $(".SC_discard_pile p").text("Discard("+ (discard_pile.length)+")");
    $(".SC_block h3").text(player.block);
    // a block imaage will appear when player gains block.
    if(player.block == 0){
        $(".SC_block").hide();
    } else {
        $(".SC_block").show();
    }
    // creates draw & discard pile list
    $(".SC_draw_pile_full ul").empty();
    $(".SC_discard_pile_full ul").empty();
    $(temporary_deck).each(function( index ) {
        $(".SC_draw_pile_full ul").append("<li>- "+temporary_deck[index].name+"</li>");
    });
    $(discard_pile).each(function( index ) {
        $(".SC_discard_pile_full ul").append("<li>- "+discard_pile[index].name+"</li>");
    });
}

// This function will generate cards for the user to play.
function generate_cards(){
    for (let i = 0; i < player.draw; i++) {
        // create a new array of active cards
        active_cards.push(temporary_deck[0]);
        // create cards in HTML
        $( ".SC_main_box" ).append( "<div class='card'><p>"+ active_cards[i].name+ "</p> <img src='"+ active_cards[i].image +"'><p>"+ active_cards[i].energy+"</p></div>" );
        // activate event listeners on cards
        $( ".card:eq("+ i +")" ).on( "click", function() {
            active_cards[i].effect(current_ennemy);
            $(this).fadeOut();
            discard_pile.push(active_cards[i]);
            update_UI();
          });
        temporary_deck.shift();
    }
}

// Comming soon!
function end_turn(){
    // reset active cards, reset ennemies status
}

// Shuffles an array - the deck in our case.
function shuffleDeck(array) {
   array = array.sort(() => Math.random() - 0.5)
}










