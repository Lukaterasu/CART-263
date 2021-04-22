let cards = [

   card_0 = {
    name: "Purify",
    energy: 1,
    image: "assets/images/cards/card3.png",
    base_damage: 5,
    description: "Deal 5 damage.",
    effect: (enemy) => {
       attack("enemy", (card_1.base_damage + player.strength)); 
    },
},
 card_1 = {
    name: "Protection",
    energy: 1,
    image:"assets/images/cards/card2.png",
    base_block: 5,
    description: "Gain 5 block.",
    effect:  (enemy) => {

        player.block += 5 + dexterity;
        update_UI();
      },
},
 card_2 = {
    name: "Exorcism",
    energy: 2,
    image:"assets/images/cards/card1.png",
    base_damage: 4,
    base_block: 4,
    description: "Deal 4 damage. Gain 4 block. Apply 1 weak to your enemy.",
    effect:  (enemy) => {
        attack("enemy", (4+ player.strength));
        player.block += 4 + player.dexterity;
        status_marker("enemy", "Weak");
        enemy.weak += 1;
        update_UI();
      },
},
 card_3 = {
  name:"Madness",
  energy: 1,
  image: "assets/images/cards/card3.png",
  description: "Lose 2 Health. Gain 1 Strength. (Strength increases the damage of your cards.)",
  effect: (enemy) => {
    damage_marker("player", "2");
    status_marker("player", ["Strengthened"]);
     player.health -= 2;
     player.strength += 1;
     update_UI();
    },
},
 card_4 = {
  name:"Desperation",
  energy: 1,
  image: "assets/images/cards/card3.png",
  description: "Inflict 2 Vulnerable on yourself. Gain 1 Dexterity. (Dexterity increases the efficiency of your block cards.)",
  effect: (enemy) => {
    status_marker("player", ["Dexterity+","Vulnerable"]);
     player.vulnerable += 2;
     player.dexterity += 1;
     update_UI();
    },
},
 card_5 = {
  name:"Pummel",
  energy: 1,
  image: "assets/images/cards/card3.png",
  base_damage: 4,
  description: "Deal 4 damage twice.",
  effect: (enemy) => {
      attack("enemy", (4+ player.strength));
      setTimeout(()=>{
        attack("enemy", (4+ player.strength));
        update_UI();
      }, 750);
      
    },
},
 card_6 = {
  name:"Banish",
  energy: 2,
  image: "assets/images/cards/card3.png",
  base_damage: 12,
  description: "Deal 12 damage. Apply 1 weak and 1 vulnerable to your enemy.",
  effect: (enemy) => {
    attack("enemy", (12+ player.strength));
    status_marker("enemy", ["Weak","Vulnerable"]);
    enemy.weak += 1;
    enemy.vulnerable += 1;

    },
},
card_7 = {
  name:"Smite",
  energy: 1,
  image: "assets/images/cards/card3.png",
  base_damage: 7,
  description: "Deal 7 damage. If your opponent is affected by status, deal 5 more.",
  effect: (enemy) => {
     if(enemy.weak > 0 || enemy.vulnerable>0){
      attack("enemy", (12+ player.strength));
     } else{
      attack("enemy", (7+ player.strength));
     }
    },
},
card_8 = {
  name:"Prayer",
  energy: 0,
  image: "assets/images/cards/card3.png",
  base_block: 7,
  description: "Gain 7 block.",
  effect: (enemy) => {
     player.block+= 7;
    },
},
card_9 = {
  name:"SaltBarrier",
  energy: 2,
  image: "assets/images/cards/card3.png",
  base_block: 12,
  description: "Gain 12 block. Inflict 2 weak on your enemy.",
  effect: (enemy) => {
    player.block+= 12;
    status_marker("enemy", ["Weak"]);
    enemy.weak+= 2;

    },
},
card_10 = {
  name:"Sanctuary",
  energy: 3,
  image: "assets/images/cards/card3.png",
  base_block: 10,
  base_damage: 10,
  description: "Gain 10 block. Deal 10 damage. Cleanse your status.",
  effect: (enemy) => {
     player.block += 10;
     attack("enemy", (10+ player.strength));
     status_marker("player", ["Cleansed"]);
     player.weak = 0;
     player.vulnerable = 0;
     player.poisoned = 0;
    },
},
card_11 = {
  name:"Escape",
  energy: 0,
  image: "assets/images/cards/card3.png",
  description: "Gain 1 energy. Draw 1 card.",
  effect: (enemy) => {
    player.energy += 1;
     draw_card(1);
    },
},

]
let enemies = [

  
ennemy_Poltergeist = {
  name: "Poltergeist",
  source: "assets/images/sprites/poltergeist_gif.gif",
  health: 25,
  max_health: 25,
  block: 0,
  weak: 0,
  vulnerable: 0,
  intro: "This house seems to have been haunted by a Poltergeist. You must cleanse it.",
  intent: undefined,
  intent_choices: ["attack", "debuff"],
  attack_phrase: ["The poltergeist intends to attack next turn.", "The poltergeist hurls a chair at you."], 
  debuff_phrase: ["The poltergeist intends to use a debuff next turn.", "The poltergeist causes you anxiety."],
  attack_damage: 6,
  defense_value: 5,
  attack:()=>{
      ennemy_attack();
  },
  debuff: ()=>{

      $(".SC_main_text").text(current_ennemy.debuff_phrase[1]);
      $(".SC_continue").hide();
      setTimeout(()=>{
          player.weak += 1;
          status_marker("player", ["Weakened"]);
          update_UI();  
          setTimeout(()=>{
              $(".SC_continue").show();
              end_enemy_turn();
          }, 1000);
      }, 2000)
  }
},
ennemy_Possessed = {
  name: "Possessed",
  source: "assets/images/sprites/possessed_gif.gif",
  health: 40,
  max_health: 40,
  block: 0,
  weak: 0,
  vulnerable: 0,
  intro: "This villager seems to have been possessed by an evil spirit. You must exorcise her.",
  intent: undefined,
  intent_choices: ["attack", "defend", "debuff"],
  attack_phrase: ["The possessed intends to attack next turn.", "The possessed lashes out at you."], 
  defend_phrase: ["The possessed intends to defend next turn.", "The possessed braces itself for impact."],
  debuff_phrase: ["The possessed intends to use a debuff next turn.", "The possessed spits out corrosive poison. (Deals two damage per turn, stacking up)"],
  attack_damage: 8,
  defense_value: 8,
  attack:()=>{
      ennemy_attack();
      

  },
  defend: ()=>{
      enemy_defend();
  },
  debuff: ()=>{
    $(".SC_main_text").text(current_ennemy.debuff_phrase[1]);
    $(".SC_continue").hide();
    setTimeout(()=>{
        player.poisoned += 2;
        status_marker("player", ["Poisoned"]);
        update_UI();  
        setTimeout(()=>{
            $(".SC_continue").show();
            end_enemy_turn();
        }, 1000);
    }, 2000)
  }
},
ennemy_Brahms = {
  name: "Brahms",
  source: "assets/images/sprites/brahms_gif.gif",
  health: 80,
  max_health: 80,
  block: 0,
  weak: 0,
  vulnerable: 0,
  intro: "Brahms is a mentally unstable killer. You must take him down.",
  intent: undefined,
  intent_choices: ["attack", "defend", "buff"],
  attack_phrase: ["Brahms intends to attack next turn.", "Brahms lunges at you."], 
  defend_phrase: ["Brahms intends to defend next turn.", "Brahms adopts a defensive position."],
  buff_phrase: ["Brahms intends to power up next turn.", "Brahms channels a mysterious dark energy. His power seems to have increased."],
  attack_damage: 8,
  defense_value: 8,
  attack:()=>{
      ennemy_attack();
      

  },
  defend: ()=>{
      enemy_defend();
  },
  buff: ()=>{
      $(".SC_main_text").text(current_ennemy.buff_phrase[1]);
      $(".SC_continue").hide();
      setTimeout(()=>{
          current_ennemy.attack_damage += 3;
          status_marker("enemy", "Strength Up");
          update_UI();  
          setTimeout(()=>{
              $(".SC_continue").show();
              end_enemy_turn();
          }, 1000);
      }, 2000)
  }
},
ennemy_Slenderman = {
  name: "Slenderman",
  source: "assets/images/sprites/slenderman_gif.gif",
  health: 150,
  max_health: 150,
  block: 0,
  weak: 0,
  vulnerable: 0,
  intro: "For your last mission, you must defeat Slenderman. This creature has caused multiple disapearances in the village.",
  intro2:"Slenderman will gain strength whenever you play a card. This strength will be unleashed whenever it attacks.",
  intent: undefined,
  intent_choices: ["attack", "defend", "debuff"],
  attack_phrase: ["Slenderman intends to attack next turn.", "Slenderman slams it's tentacles on you."], 
  defend_phrase: ["Slenderman intends to defend next turn.", "Slenderman adopts a defensive position."],
  debuff_phrase: ["Slenderman intends to use a debuff next.", "Slenderman stalks you maliciously..."],
  attack_damage: 12,
  defense_value: 15,
  attack:()=>{

      ennemy_attack();
      status_marker("enemy", ["Strength Reset"])
      current_ennemy.attack_damage = 15;
      

  },
  defend: ()=>{
      enemy_defend();
  },
  debuff: ()=>{
      $(".SC_main_text").text(current_ennemy.debuff_phrase[1]);
      $(".SC_continue").hide();
      setTimeout(()=>{
          player.weak += 2;
          player.vulnerable += 2;
          status_marker("enemy", "Strength Up");
          update_UI();  
          setTimeout(()=>{
              $(".SC_continue").show();
              end_enemy_turn();
          }, 1000);
      }, 2000)
  }
}
]




