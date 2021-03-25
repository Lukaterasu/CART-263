// variables
let red = "#C70025";
let black = "#121420";
let white = "#F2F4F3";

let stage = 1;

let player = {
    health: 50,
    strength: 0,
    dexterity: 0,
    block: 0,
    energy: 3,
    draw: 2,
    artifacts: 0,
    gold: 100,
};

let ennemy_Brahms = {
    name: "Brahms",
    health: 20 * stage,
    deck: undefined,
    intent: undefined

}
let current_ennemy = ennemy_Brahms;
let permanent_deck = [];
let temporary_deck = [];
let discard_pile = [];
let card_1 = {
    name: "Purify",
    energy: 1,
    image: "assets/images/cards/card1.png",
    description: "Deal 6 damage.",
    effect: undefined,
}
let card_2 = {
    name: "Protection",
    energy: 1,
    image:"assets/images/cards/card2.png",
    description: "Gain 5 block.",
    effect: undefined,
}
let card_3 = {
    name: "Exorcise",
    energy: 1,
    image:"assets/images/cards/card3.png",
    description: "Deal 8 damage. Apply 2 despair.",
    effect: undefined,
}

permanent_deck.push(card_1);
permanent_deck.push(card_2);
permanent_deck.push(card_3);
permanent_deck.push(card_1);
permanent_deck.push(card_2);
permanent_deck.push(card_3);

// temporary_deck = permanent_deck;


let ennemy_decks = [];

start_combat();

function start_combat(){
    temporary_deck = permanent_deck.slice();
    shuffleDeck(temporary_deck);
    start_turn();
    update_UI();    
    $( ".SC_view_deck" ).click(function() {
        $( ".SC_view_deck_full" ).toggle();
    });
    $( ".SC_draw_pile" ).click(function() {
        $( ".SC_draw_pile_full" ).toggle();
    });
    $( ".SC_discard_pile" ).click(function() {
        $( ".SC_discard_pile_full" ).toggle();
    });


    $(permanent_deck).each(function( index ) {
        $(".SC_view_deck_full ul").append("<li>- "+permanent_deck[index].name+"</li>");
    });
    $(temporary_deck).each(function( index ) {
        $(".SC_draw_pile_full ul").append("<li>- "+temporary_deck[index].name+"</li>");
    });
   
    

}
function start_turn(){
    generate_cards();
    
}

function update_UI(){
    $(".SC_enemy_health p").text(current_ennemy.name + ": "+ current_ennemy.health);
    $(".SC_player_health p").text("Health: "+ player.health);
    $(".SC_player_energy p").text("Energy: "+ player.energy);
    $(".SC_player_artifacts p").text("Artifacts("+ player.artifacts+")");
    $(".SC_draw_pile p").text("Draw("+ (temporary_deck.length)+")");


}

function end_turn(){

}
function generate_cards(){
    // $( ".SC_main_box" ).append( "<p>Test</p>" );
    for (let i = 0; i < player.draw; i++) {
        
        $( ".SC_main_box" ).append( "<div class='card'><p>"+ temporary_deck[0].name+ "</p> <img src='"+ temporary_deck[0].image +"'><p>"+ temporary_deck[0].energy+"</p></div>" );
        discard_pile.push(temporary_deck[0].name);
        temporary_deck.shift();
    }
    

}
function shuffleDeck(array) {
   array = array.sort(() => Math.random() - 0.5)
}










