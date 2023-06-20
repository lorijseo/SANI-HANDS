// import {cards, cardCombo} from "./cardInfo.js";

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
    displayCorrect(question1);

})

quizBtn2.addEventListener("click", function(e){
    e.preventDefault();
    displayCorrect(question2);

})

quizBtn3.addEventListener("click", function(e){
    e.preventDefault();
    displayCorrect(question3);

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
    parent.querySelector(".cardsInfo").innerHTML = ` <div class="displayCorrect">${isCorrect}! </div> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, at laboriosam atque aut repudiandae consequatur, vitae neque error aperiam, eius ut iure? Unde ex quam suscipit, ut doloribus necessitatibus voluptatem?</p>
    `
}



// look at card combo


//for each item create card

//display card in a combo