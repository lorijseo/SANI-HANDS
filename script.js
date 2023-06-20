// import {cards, cardCombo} from "./cardInfo.js";
// console.log(cards);
// console.log(cardCombo);

// parent = document.querySelector("#info2")
// parent.querySelector("#answer").style.display = "flex";


// document.querySelector("#answer").style.display = "none";


// const questionCard1 = document.querySelector("#question1");
// questionCard1.querySelector("#cardDescr").style.display = "none";

// const questionCard2 = document.querySelector("#question2");
// questionCard2.querySelector("#cardDescr").style.display = "none";

question1 = document.querySelector("#info1")
const quizBtn1 = question1.querySelector(".quizBtn")

question2 = document.querySelector("#info2")
const quizBtn2 = question2.querySelector(".quizBtn")

question3 = document.querySelector("#info3")
const quizBtn3 = question3.querySelector(".quizBtn")

//from button to parent we need to go up three parents 

quizBtn1.addEventListener("click", function(e){
    e.preventDefault();
    displayExplanation(question1)

})

quizBtn2.addEventListener("click", function(e){
    e.preventDefault();
    displayExplanation(question2)

})

quizBtn3.addEventListener("click", function(e){
    e.preventDefault();
    displayExplanation(question3)

})


function displayCorrect(parent){
    var choice1 = parent.querySelector("#choice1").checked;
    var choice2 = parent.querySelector("#choice2").checked;
    var isCorrect = ""
    if ((choice1 && parent.querySelector("#choice1").value == "correct") || (choice2 && parent.querySelector("#choice2").value == "correct")){
        isCorrect = "Correct";
    }
    else{
        isCorrect = "Incorrect";
    }

    parent.querySelector("#question1").querySelector("#cardDescr").style.display = "block";
    parent.querySelector("#question2").querySelector("#cardDescr").style.display = "block";

    parent.querySelector(".cardsInfo").style.display = 'flex';
    parent.querySelector("#answer").style.display = 'flex';
    // parent.querySelector(".cardsInfo").innerHTML = ` <div class="displayCorrect">${isCorrect}! </div> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, at laboriosam atque aut repudiandae consequatur, vitae neque error aperiam, eius ut iure? Unde ex quam suscipit, ut doloribus necessitatibus voluptatem?</p>
    // `
    return isCorrect;
}

function displayExplanation(parent){
    let isCorrect = displayCorrect(parent);

    let ingredientsCollection = parent.getElementsByClassName("ingredientCard");

    //get first name
    let ingredient1 = ingredientsCollection[0].id;
    let firstLetter = ingredient1.charAt(0).toUpperCase();
    ingredient1 = firstLetter + ingredient1.slice(1);

    console.log(ingredient1);
  
    console.log(ingredientsCollection[1].id);

    //get second name
    let ingredient2 = ingredientsCollection[1].id;

    firstLetter = ingredient2.charAt(0).toUpperCase();
    ingredient2 = firstLetter + ingredient2.slice(1);

    console.log(ingredient2);

    // if there's an underscore
    if (ingredient2.indexOf("_") !== -1){
        let underscore = ingredient2.indexOf("_");
        const secondLetter = ingredient2.charAt(underscore + 1).toUpperCase();
        ingredient2 = ingredient2.slice(0,9) + secondLetter + ingredient2.slice(10);
        ingredient2 = ingredient2.replace("_", " ");
    }

    for (let i=0; i<cardCombo.length;i+=1){
        let ingredientsList = cardCombo[i].ingredients;
        if ((ingredientsList.indexOf(ingredient1) !== -1) && (ingredientsList.indexOf(ingredient2) !== -1)){
            parent.querySelector(".cardsInfo").innerHTML = ` 
            <div class="displayCorrect">${isCorrect}! </div> <p>${cardCombo[i].explanation}</p>
            `
        }
    }


}


let cardCombo = [
    {
        ingredients: ["Hydrogen Peroxide", "Vinegar"],
        outcome: "Peracetic Acid",
        explanation: "weeeeepo"
    },

    {
        ingredients: ["Bleach", "Vinegar"],
        outcome: "Chlorine Gas",
        explanation: ""
    },

    {
        ingredients: ["Bleach", "Ammonia"],
        outcome: "Chloramines",
        explanation: ""
    },

    {
        ingredients: ["Bleach", "Rubbing Alcohol"],
        outcome: "Chloroform",
        explanation: ""
    },

    {
        ingredients: ["Bleach", "Toilet Bowl Cleaner"],
        outcome: "Chlorine Gas",
        explanation: ""
    },

    {
        ingredients: ["Bleach", "Mold Remover"],
        outcome: "Chlorine Gas",
        explanation: ""
    },

    {
        ingredients: ["Bleach", "Oven Cleaner"],
        outcome: "Chlorine Gas",
        explanation: ""
    },

    {
        ingredients: ["Vinegar", "Baking Soda"],
        outcome: "Nullify",
        explanation: ""
    },

    {
        ingredients: ["Bleach", "Drain Cleaner"],
        outcome: "Chlorine Gas",
        explanation: ""
    },

    {
        ingredients: ["Bleach", "Glass Cleaner"],
        outcome: "Chlorine Gas",
        explanation: ""
    },

    {
        ingredients: ["Trichloroisocyanuric Acid", "Oxalic Acid"],
        outcome: "Chlorine Gas",
        explanation: ""
    },

    {
        ingredients: ["Bleach", "Lemon Juice"],
        outcome: "Chlorine Gas"
    },

    {
        ingredients: ["Drain Cleaner", "Drain Cleaner"],
        outcome: "Chlorine Gas"
    },


];