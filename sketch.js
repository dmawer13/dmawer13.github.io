let cards;
const key = 'd67987e1-34d3-42a3-8461-f9519de91413';
//const url = 'https://api.pokemontcg.io/v2/cards?q=id:base1';

let cardArray = [];
let randomArray = [];

let sel;
let button;
let cardSet = 'base1';

//let url = 'https://api.pokemontcg.io/v2/cards?q=set.name:' + cardSet;

function setup() {
    createCanvas(600, 825);
    textAlign(CENTER);
    background(0);
    background(200);
    sel = createSelect();
    sel.position(5, 5);
    // 6/7 update: the options below are all by the ID's according the API.   
    sel.option('Base', 'base1'); //Base
    sel.option('Jungle', 'base2'); //Jungle
    sel.option('Wizards Black Star Promos', 'basep'); //Wizards Black Star Promos
    sel.option('Fossil', 'base3'); //Fossil
    sel.option('Base Set 2', 'base4'); //Base Set 2
    sel.option('Team Rocket', 'base5'); //Team Rocket
    sel.option('Gym Heroes', 'gym1'); //Gym Heroes
    sel.option('Gym Challenge', 'gym2'); //Gym Challenge
    sel.option('Neo Genesis', 'neo1'); //Neo Genesis
    sel.option('Neo Discovery', 'neo2'); //Neo Discovery
    sel.option('Southern Islands', 'si1'); //Southern Islands
    sel.option('Neo Revelation', 'neo3'); //Neo Revelation
    sel.option('Neo Destiny', 'neo4'); //Neo Destiny

    //  sel.selected('Jungle');
    sel.changed(setCard);

    button = createButton('Run');
    button.position(200, 5);
    button.mousePressed(pingURL);
    setCard();
}

function setCard() {
    cardSet = sel.value();
    console.log("Just changed the dropdown to: " + cardSet);
    loadJSON('https://api.pokemontcg.io/v2/cards?q=set.id:' + cardSet, gotData);
    //    it's the set.name in the query above that's important.  I think I should change to set.id because all id's are single words, no spaces. But then that would make the dropdown ugly because they're a little nonsensical.  Maybe I should have an intermediate step where the dropdown names are readable but then the query goes by the ID "behind the scenes".
}

function pingURL() {
    makeSetArray();
    setInterval(randomizedSelectCard, 2000);
    //    https://www.w3schools.com/js/js_timing.asp
}

function gotData(data) {
    cards = data;
    console.log("gotData ran! Set: " + cardSet);
}

function setSet() {
    cardSet = sel.value();
    loadJSON(url, gotData);
    firstCardPrint();
    console.log(cardSet);
}

function firstCardPrint() {
    if (cards) {
        //YOU NEED TO WAIT FOR CARDS TO LOAD BEFORE GOING INTO THE JSON
        let generateRando = Math.floor(random(0, cards.data.length));

        let response = cards.data[generateRando].images.large;
        //        text(response, width/2, height/2 + 20);
        console.log("This set has " + cards.data.length + " cards");
        console.log("And I'm printing card number " + generateRando);
        loadImage(response, img => {
            image(img, 0, 0);
        });
        //defo get rid of this below once ready. Just using it to print JSON response once.
        //        noLoop();
    } else {
        console.log("no cards")
    }
}

function timedCardPrint() {
    //borrowed from firstCardPrint function, but omitted console logs.
    console.log(cardArray);
    let rando = Math.floor(random(0, cards.data.length));
    console.log(rando);

    if (cards) {
        let response = cards.data[rando].images.large;

        //        for (let i = 0; i < cardArray.length - 1; i++) {
        //            if (rando != cardArray[i]) {
        if (!cardArray.includes(rando)) {
            cardArray.push(rando);
            loadImage(response, img => {
                image(img, 0, 0);
            });
        } else {
            console.log("duplicate found: " + rando);
        }
        //        }

        //instead of this way, let's upfront find the number of cards in the set, make an arraylist with those numbers randomized, then iterate through that list.  
    }
}


function makeSetArray() {
      if (cards) {
//        let rando = Math.floor(random(1, cards.data.length));
        console.log("this set has " + cards.data.length + " cards.")
       for(let i = 0; i<cards.data.length; i++) {
           randomArray.push(i);
       }
        console.log(randomArray);
}}

function randomizedSelectCard() {
    //ugh, think of a new name.
    let selectCard = 1;
    
    let response = cards.data[selectCard].images.large;
    loadImage(response, img => {
        image(img, 0,0);
    })

 
}



function draw() {}
