
// This section will define each card and combat fonctions.
let card_1 = {
    name: "Purify",
    energy: 1,
    image: "assets/images/cards/card3.png",
    description: "Deal 5 damage.",
    effect: (enemy) => {
        enemy.health -= 5;
        update_UI();
        
      },
}
let card_2 = {
    name: "Protection",
    energy: 1,
    image:"assets/images/cards/card2.png",
    description: "Gain 5 block.",
    effect:  (enemy) => {

        player.block += 5;
        update_UI();
      },
}
let card_3 = {
    name: "Sanctuary",
    energy: 1,
    image:"assets/images/cards/card1.png",
    description: "Deal 5 damage. Gain 3 block",
    effect:  (enemy) => {
        enemy.health -= 5;
        player.block += 3;
        update_UI();
      },
}