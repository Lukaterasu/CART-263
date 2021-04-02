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
    draw: 3,
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
let active_cards = [];


permanent_deck.push(card_1);
permanent_deck.push(card_2);
permanent_deck.push(card_3);
permanent_deck.push(card_1);
permanent_deck.push(card_2);
permanent_deck.push(card_3);

// temporary_deck = permanent_deck;


let ennemy_decks = [];

start_combat();
// card_1.effect(current_ennemy);

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
    $(".SC_discard_pile p").text("Discard("+ (discard_pile.length)+")");
    $(".SC_block h3").text(player.block);
    if(player.block == 0){
        $(".SC_block").hide();
    } else {
        $(".SC_block").show();
    }


}

function end_turn(){

}

function generate_cards(){
    for (let i = 0; i < player.draw; i++) {
        active_cards.push(temporary_deck[0]);
        $( ".SC_main_box" ).append( "<div class='card'><p>"+ active_cards[i].name+ "</p> <img src='"+ active_cards[i].image +"'><p>"+ active_cards[i].energy+"</p></div>" );
      
        $( ".card:eq("+ i +")" ).on( "click", function() {
            active_cards[i].effect(current_ennemy);
            $(this).fadeOut();
            discard_pile.push(active_cards[i]);
            update_UI();
          });

        temporary_deck.shift();
    }

    

}

function shuffleDeck(array) {
   array = array.sort(() => Math.random() - 0.5)
}










