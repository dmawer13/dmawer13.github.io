// 5/6/22 TODO: What do I ultimately want this thing to do, in pseudocode terms?  
// Be a digital photo frame, with randomized cards changing every 1 minute or so.
// I would like to be able to choose, from a dropdown, the set.  
// Today, let's:
// Make a card appear, using code below
// Randomly change the card every 5 seconds


let cardsPayload;
const key = 'd67987e1-34d3-42a3-8461-f9519de91413';
//const url = 'https://api.pokemontcg.io/v2/cards?q=id:base1';

let cardArray = [];
let randomArray = [];

let sel;
let runButton;
let nextButton;
let cardSet = 'base1'; // <-- this is just setting the default as base 1

//let url = 'https://api.pokemontcg.io/v2/cards?q=set.name:' + cardSet;

function setup() {
    createCanvas(600, 825);
    textAlign(CENTER);
    background(0);
    background(200);
    sel = createSelect();
    sel.position(5, 5);

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
    sel.option('Expedition Base Set', 'ecard1'); //
    sel.option('Aquapolis', 'ecard2'); //
    sel.option('Skyridge', 'ecard3'); //
    // Why isn't this working below?
    sel.selected('Southern Islands', 'si1');
    
//    selRarity = createSelect();
//    selRarity.position(5, 30);
//    selRarity.option('Common', '%20rarity:common');
//    selRarity.option('Uncommon', '%20rarity:uncommon');
//    selRarity.option('Rare', '%20!rarity:rare');
//    selRarity.option('Holo Rare', '%20rarity:%22holo%20rare%22');
    
    holoCheck = createCheckbox('holo', false);
    holoCheck.position(5,30);
    holoCheck.changed(holoChk);

    
    
    sel.changed(setCard);

    runButton = createButton('mkArr()');
    runButton.position(200, 5);
    //    runButton.mousePressed(randomizedSelectCard);
    runButton.mousePressed(makeArray);
    //uncomment below to change to the 5 second timer.
    //    runButton.mousePressed(pingURL);

    nextButton = createButton('randSelCar()');
    nextButton.position(270, 5);
    nextButton.mousePressed(randomizedSelectCard);

    listButton = createButton('dispShuf()');
    listButton.position(380, 5);
    listButton.mousePressed(displayShuffle);


//    setCard(); // <--so this is setting the card one time. 

    waitForURL();
} // end of setup loop


let holoAppend = '';
    
    function holoChk() {
       if (holoCheck.checked()) {
           console.log("holo checked");
           holoAppend = '%20!rarity:%22rare%20holo%22';
//           console.log(holoAppend);
       } else {
           console.log("holo unchecked");
           holoAppend = '';
//           console.log(holoAppend);
       }
    }


function gotData(data) {
    cardsPayload = data;
    console.log("gotData() ran! Set: " + cardSet);
}

function URLmaker() {
    // this should promise into setCard() {
    let url = 'https://api.pokemontcg.io/v2/cards?q=set.id:' + cardSet + holoAppend;
    return url;
    console.log(url);
}

async function waitForURL() {
    let url = await URLmaker();
    console.log(url);
    loadJSON(url, gotData);
}

function setCard() {
    // this should await a URL former....
    cardSet = sel.value();
//    holoAppend = '%20rarity:%22rare%20holo%22'; // okay, this needs to be scoped inside here, or make a workaround.
    console.log("Just changed the dropdown to: " + cardSet);
    loadJSON('https://api.pokemontcg.io/v2/cards?q=set.id:' + cardSet, gotData);
// below should be awaiting from URLmaker():
//    loadJSON(URLmaker, gotData); 
}

// Would like to be able to draw from multiple sets, like a checkbox system that would prepare a bunch of sets together, then cycle through those sets aka a digital photo frame. So,
// Let's make a function that:
// 1) GETs a whole set
// 2) places the set's images into an array
// 3) shows a random card from the array
// 4) randomly cycles through the array, but doesn't select duplicates
// 5) when there are no more cards left to show in the array, resets the shuffle.

function pingURL() {
    //    makeSetArray();
    console.log('pingURL() just ran')
    randomizedSelectCard();
    setInterval(randomizedSelectCard, 5000);
    //    console.log('5 seconds')
    //    https://www.w3schools.com/js/js_timing.asp
}


function makeArray() {
    console.log('makeArray() ran');
    let response = cardsPayload.data; // it's a JSON object
    //    console.log(response); // What's the datatype of response?
    //    let array = [];
    for (let i = 0; i < response.length; i++) {
        array.push(response[i].images.large);
    }
}

let array = []; // must be scoped here, outside the function that uses it.

function displayShuffle() {
//    console.log('https://api.pokemontcg.io/v2/cards?q=set.id:' + cardSet + holoAppend);
    
    let list2 = array; //scoped outside
    let youChoose = random(array);
    let entry = array.indexOf(youChoose);
    console.log("chose card " + entry + " out of " + array.length);

    // get an if list.length > 0 , then splice. else, 
    array.splice(entry, 1);
    console.log(array.length);

    loadImage(youChoose, img => {
        image(img, 0, 0);
    })
}

function randomizedSelectCard() {
    let response = random(cardsPayload.data).images.large; // <-- this is doing a lot; p5.js random() can take an array and will choose a random entry from the array.  Then, from the random array entry, it's grabbing images.large, as an image. 
    loadImage(response, img => {
        image(img, 0, 0);
    })
}

function makeSetArray() { // this is largely useless, or at least no longer required to go through. but maybe I want it for later if I rotate through multiple sets.
    if (cardsPayload) {
        //        let rando = Math.floor(random(1, cards.data.length));
        console.log("makeSetArray(): this set has " + cardsPayload.data.length + " cards.")
        for (let i = 0; i < cardsPayload.data.length; i++) {
            randomArray.push(i);
        }
        console.log('makeSetArray() ran')
        console.log(randomArray);
    }
}

function setSet() {
    cardSet = sel.value();
    loadJSON(url, gotData);
    firstCardPrint();
    console.log(cardSet);
}

function firstCardPrint() {
    if (cardsPayload) {
        //YOU NEED TO WAIT FOR CARDS TO LOAD BEFORE GOING INTO THE JSON
        let generateRando = Math.floor(random(0, cards.data.length));

        let response = cardsPayload.data[generateRando].images.large;
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







function draw() {


}