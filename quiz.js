// **********************QUIZPAGE**********************
question1 = document.querySelector("#info1")
const quizBtn1 = question1.querySelector(".quizBtn")

question2 = document.querySelector("#info2")
const quizBtn2 = question2.querySelector(".quizBtn")

question3 = document.querySelector("#info3")
const quizBtn3 = question3.querySelector(".quizBtn")

//from button to parent we need to go up three parents 

quizBtn1.addEventListener("click", function(e){
    e.preventDefault();
    displayQuizExplanation(question1);
    quizBtn1.style.display = "none";

})

quizBtn2.addEventListener("click", function(e){
    e.preventDefault();
    displayQuizExplanation(question2);
    quizBtn2.style.display = "none";

})

quizBtn3.addEventListener("click", function(e){
    e.preventDefault();
    displayQuizExplanation(question3)
    quizBtn3.style.display = "none";

})


function displayCorrect(parent){
    var choice1 = parent.querySelector(".choice1").checked;
    var choice2 = parent.querySelector(".choice2").checked;
    var isCorrect = false;

    //verify correctness
    if ((choice1 && parent.querySelector(".choice1").value == "correct") || (choice2 && parent.querySelector(".choice2").value == "correct")){
        isCorrect = true;
    }
 
    //disabled unchecked option
    if (choice1){
        parent.querySelector(".choice2").disabled = true;
    }
    else{
        parent.querySelector(".choice1").disabled = true;
    }

    //display answers
    parent.querySelector("#question1").querySelector("#cardDescr").style.display = "block";
    parent.querySelector("#question2").querySelector("#cardDescr").style.display = "block";

    parent.querySelector(".cardsExplanation").style.display = 'flex';
    parent.querySelector("#answer").style.display = 'flex';

    return isCorrect;
}

function displayQuizExplanation(parent){
    let isCorrect = displayCorrect(parent);

    let ingredientsCollection = parent.getElementsByClassName("ingredientCard");

    //get first ingredient name
    let ingredient1 = ingredientsCollection[0].id;
    let firstLetter = ingredient1.charAt(0).toUpperCase();
    ingredient1 = firstLetter + ingredient1.slice(1);


    //get second ingredient name
    let ingredient2 = ingredientsCollection[1].id;

    firstLetter = ingredient2.charAt(0).toUpperCase();
    ingredient2 = firstLetter + ingredient2.slice(1);


    // if there's an underscore
    if (ingredient2.indexOf("_") !== -1){
        let underscore = ingredient2.indexOf("_");
        const secondLetter = ingredient2.charAt(underscore + 1).toUpperCase();
        ingredient2 = ingredient2.slice(0,underscore+1) + secondLetter + ingredient2.slice(underscore+2);
        ingredient2 = ingredient2.replace("_", " ");
    }


    // display explanation
    for (let i=0; i<cardCombo.length;i+=1){
        let ingredientsList = cardCombo[i].ingredients;
        if ((ingredientsList.indexOf(ingredient1) !== -1) && (ingredientsList.indexOf(ingredient2) !== -1)){
            if (isCorrect) {
                parent.querySelector(".cardsExplanation").innerHTML = ` 
                <div class="displayCorrect" id="correct_icon"><i class="fa-solid fa-check"></i> </div> <p class="displayQuizExplanation">${cardCombo[i].explanation}</p>
                `
            }
            else{
                parent.querySelector(".cardsExplanation").innerHTML = ` 
                <div class="displayCorrect" id="wrong_icon"><i class="fa-solid fa-xmark"></i> </div> <p class="displayQuizExplanation">${cardCombo[i].explanation}</p>
                `
            }

        }
    }


}



let cardCombo = [
    {
        ingredients: ["Hydrogen Peroxide", "Vinegar"],
        outcome: "Peracetic Acid",
        explanation: "Mixing Hydrogen Peroxide and Vinegar can create Peracetic Acid. You can use both of these ingredients to keep surfaces clean and disinfected as long as one completely dries before using the other."
    },

    {
        ingredients: ["Bleach", "Vinegar"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Bleach and Vinegar can create Chlorine Gas. Bleach is recommended to be mixed only with water. "
    },

    {
        ingredients: ["Bleach", "Ammonia"],
        outcome: "Chloramine",
        explanation: "Mixing Bleach and Ammonia can create Chloramine. Bleach is recommended to be mixed only with water."
    },

    {
        ingredients: ["Bleach", "Isopropyl Alcohol"],
        outcome: "Chloroform",
        explanation: "Mixing Bleach and Isopropyl Alcohol can create Chloroform. Bleach is recommended to be mixed only with water."
    },

    // {
    //     ingredients: ["Vinegar", "Isopropyl Alcohol"],
    //     outcome: "Glass and Mirror Cleaner",
    //     explanation: "Mixing Vinegar and Isopopyl Alcohol create a spray for glass and mirror cleaner. They can give a nice shine for tiles and other surfaces."
    // },

    {
        ingredients: ["Bleach", "Toilet Bowl Cleaner"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Bleach and Toilet Bowl Cleaner can create Chlorine Gas. Bleach is recommended to be mixed only with water."
    },

    {
        ingredients: ["Bleach", "Mold Remover"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Bleach and Mold Remover can create Chlorine Gas. Bleach is recommended to be mixed only with water."
    },

    {
        ingredients: ["Bleach", "Oven Cleaner"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Bleach and Oven Cleaner can create Chlorine Gas. Bleach is recommended to be mixed only with water."
    },

    {
        ingredients: ["Vinegar", "Baking Soda"],
        outcome: "Nullify",
        explanation: "Mixing Vinegar and Baking Soda creates a nonharmful, oily mixture. It's not a good combination for cleaning because it is mostly used for volcano eruptions for science fairs."
    },

    {
        ingredients: ["Bleach", "Drain Cleaner"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Bleach and Drain Cleaner can create Chlorine Gas. Bleach is recommended to be mixed only with water."
    },

    {
        ingredients: ["Bleach", "Glass Cleaner"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Bleach and Glass Cleaner can create Chlorine Gas. Bleach is recommended to be mixed only with water."
    },

    {
        ingredients: ["Trichloroisocyanuric Acid", "Oxalic Acid"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Trichloroisocyanuric Acid and Oxalic Acid can create Chlorine Gas. Oxalic Acid reacts violently with oxidixing agents."
    },

    {
        ingredients: ["Bleach", "Lemon Juice"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Bleach and Lemon Juice can create Chlorine Gas. Bleach is recommended to be mixed only with water."
    },

    {
        ingredients: ["Drain Cleaner", "Drain Cleaner"],
        outcome: "Chlorine Gas",
        explanation: "Mixing Drain Cleaner with a different Glass Cleaner can create Chlorine Gas. Most Drain Cleaners have bleach and other acid that release Chlorine Gas or other hazardous gas."
    },


];

