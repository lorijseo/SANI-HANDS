// import {cards, cardCombo} from "./cardInfo.js";

document.querySelector("#answer").style.display = "none";



const questionCard1 = document.querySelector("#question1");
questionCard1.querySelector("#cardDescr").style.display = "none";

const questionCard2 = document.querySelector("#question2");
questionCard2.querySelector("#cardDescr").style.display = "none";

const quizBtn = document.querySelector(".quizBtn")
quizBtn.addEventListener("click", function(e){
    e.preventDefault();
    var choice1 = document.querySelector("#choice1").checked;
    var choice2 = document.querySelector("#choice2").checked;
    var isCorrect = ""
    if ((choice1 && document.querySelector("#choice1").value == "correct") || (choice2 && document.querySelector("#choice2").value == "correct")){
        isCorrect = "Correct";
    }
    else{
        isCorrect = "Incorrect";
    }

    questionCard1.querySelector("#cardDescr").style.display = "block";
    questionCard2.querySelector("#cardDescr").style.display = "block";

    document.querySelector(".cardsInfo").style.display = 'flex';
    document.querySelector("#answer").style.display = 'flex';
    document.querySelector(".cardsInfo").innerHTML = ` <div class="displayCorrect">${isCorrect}! </div> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, at laboriosam atque aut repudiandae consequatur, vitae neque error aperiam, eius ut iure? Unde ex quam suscipit, ut doloribus necessitatibus voluptatem?</p>
    `

})






// look at card combo


//for each item create card

//display card in a combo