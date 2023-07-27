async function getData(whichData){
    const response = await fetch("data.json");
    const data = await response.json();
    if(whichData === "combo"){
        return data.combo
    }
    else if (whichData === "cards"){
        return data.cards
    }
}

//compile araay of all cards
async function allCards(data){
    let cardData = []
    for (let i=0; i<data.length; i++){
        const cardsFound = await searchCards(data[i].ingredients[0], data[i].ingredients[1], data[i].outcome, data[i].explanation);
        cardData[i] = cardsFound;
        // console.log(cardData)
    }
    return cardData
}

//fetch cards from names
async function searchCards(name1, name2, name3, info){
    const cardNames = [name1, name2, name3];

    const response = await fetch("data.json");
    const data = await response.json();
    let saveData = [];
    let counter = 0;
    for (let i=0; i<=data.cards.length; i++){
        // console.log(data.cards[i].name)
        // console.log(counter)
        // base case if all three cards are found
        if (counter === 3){
            saveData.push(info);
            return saveData
        }
        else if (cardNames.includes(data.cards[i].name)){
            const position = cardNames.indexOf(data.cards[i].name);

            //consider if same card is added twice
            if (saveData[position] == undefined){
                saveData[position] = data.cards[i]
                
            }
            else{
                saveData[position+1] = data.cards[i]
            }
            counter +=1;

            // console.log(saveData)
        }

    }
}



function findCardId(cardData){
    //change name to lowercase with underscore
    let cardName = cardData.name;
    let allLowerCase = cardName.toLowerCase();

    //consider if there is at least one space in the name
    if (allLowerCase.indexOf(" ") !== -1){
        for (let i=0; i<cardName.length; i++){
            let spaceFound = allLowerCase.indexOf(" ");

            if (spaceFound !== -1){
                let currentWord = allLowerCase.slice(0,spaceFound) + "_" + allLowerCase.slice(spaceFound+1);
                allLowerCase = currentWord;
            }
        }
    }
    return allLowerCase;
}



//param: idName
function cardDescription(cardData){

    if (cardData.type == "Ingredient"){
        return`



        <div class="descr">
        <i class="fa-solid fa-thumbs-up fa-lg" style="color: green;"></i>
        <span>${cardData.good} </span>
        </div>
        <div class="descr">
        <i class="fa-solid fa-thumbs-down fa-lg" style="color: red"></i> 
        <span>${cardData.bad}</span> 
        </div>
        `
    }

    else if (cardData.type == "Effect"){
        return `
            <div class="descr">
            <i class="fa-solid fa-skull-crossbones fa-lg" style="color: orange"></i>
            <span>${cardData.info}</span>
          </div>
        `
    }

    else if ((cardData.type == "Product")||(cardData.type=="Nullify")){
        return`
            <p><span style="padding-right:5px;"></span>${cardData.info} </p>
        `
    }



}


function findIcon(data){
    let cardType = data.type;
    if (cardType == "Ingredient"){
        return '<i class="fa-solid fa-flask fa-xl" style="color: green;"></i>'
    }

    else if (cardType == "Effect"){
        return '<i class="fa-solid fa-biohazard fa-xl" style="color: #cc350f;"></i>'
    }

    else if (cardType == "Product"){
        return '<i class="fa-solid fa-spray-can-sparkles fa-xl" style="color: #2f72e4;"></i>'
    }

    else if (cardType == "Nullify"){
        return '<i class="fa-solid fa-poo fa-xl" style="color: #717d94;"></i>'
    }

}

function createContainer(idNum){

    const displayContainer = document.querySelector(".userDisplay");

    let newInfo = document.createElement('div');
    // newInfo.className = "displayCards";
    newInfo.id = "info" + idNum

    displayContainer.appendChild(newInfo);

}

function createQuizContainer(idNum){

    const displayContainer = document.querySelector(`#info${idNum}`);

    let newQuiz = document.createElement('div');
    newQuiz.className = "quiz"
    newQuiz.id = "quiz" + idNum

    displayContainer.appendChild(newQuiz);

}

function createExplanationContainer(idNum){
    const displayContainer = document.querySelector(`#info${idNum}`);

    let newExplanation = document.createElement('div');
    newExplanation.className = "cardsExplanation"
    newExplanation.id = "expl" + idNum

    displayContainer.appendChild(newExplanation);
}

function createInfoTitle(data,num){
    const questionNum = num + 1;
    const card1 = data[0].name;
    const card2 = data[1].name;

    return`
    <div class="infoDescr">Question#${questionNum}: ${card1} & ${card2}</div>`
}

// function createExplanation(explanation){
//     return `      <div class="cardsInfo">
//     <p>${explanation}</p>
//   </div>`

// }

function displayInfo(data,num){
    const title = createInfoTitle(data,num);
    const card1 = createCard(data[0],1);
    const card2 = createCard(data[1],2);
    const card3 = createCard(data[2],3);

    // document.querySelector(".test").innerHTML = `${show}`

    return `
    ${title} ${card1} <p id="plus">+</p> ${card2} <p id="equal">=</p> ${card3} `

}


function findQuizCard(num){
    if (num === 1){
        return "question1"
    }
    else if (num === 2){
        return "question2"
    }
    else{
        return "answer"
    }
}

//param: num
function createCard(cardData,num){
    let cardType = cardData.type;
    let formatType = cardType.charAt(0).toLowerCase() + cardType.slice(1);

    // does not consider two worded names, account for underscore
    let formatName = findCardId(cardData)
    // let supplyNum = "supply"+num

    //determine icon 
    const getIcon = findIcon(cardData);

    const description = cardDescription(cardData);

    const quizCard = findQuizCard(num);

    return `
        <div class="${formatType + "Card"}" id="${formatName}">
        <div class="cardContent" id=${quizCard}>

        <div class="title">
        ${getIcon}
        <span class="${formatType + "Descr"}" id="cardName">${cardData.name}</span>
        </div>

        <img src="${cardData.img}" alt=" style="height=128.42px"  style = "object-fit:contain">
  
        <div class="${formatType + "Descr"}" id="cardDescr"> ${description}

        </div>
        </div>
    </div>
    `
};


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
    parent.querySelector("#question1").querySelector("#cardDescr").style.display = "flex";
    parent.querySelector("#question2").querySelector("#cardDescr").style.display = "flex";

    parent.querySelector(".cardsExplanation").style.display = 'flex';
    parent.querySelector("#answer").style.display = 'flex';
    // console.log(isCorrect)
    return isCorrect;
}

function displayQuizExplanation(cardCombo, parent){
    let isCorrect = displayCorrect(parent);
    console.log(isCorrect)

    if (isCorrect) {
        return ` 
        <div class="displayCorrect" id="correct_icon"><i class="fa-solid fa-check"></i> </div> <p class="displayQuizExplanation">${cardCombo[3]}</p>
        `
    }
    else{
        return ` 
        <div class="displayCorrect" id="wrong_icon"><i class="fa-solid fa-xmark"></i> </div> <p class="displayQuizExplanation">${cardCombo[3]}</p>
        `
    }

}




const showBtn = document.querySelector("#showInfo");
showBtn.addEventListener("click", async function(e){
    e.preventDefault();
    document.querySelector(".userDisplay").innerHTML = "";
    const comboData = await getData("combo");

    const allCardsData = await allCards(comboData);
    // console.log(allCardsData);

    for (let i=0; i<allCardsData.length; i++){
        const currentData = allCardsData[i];
        console.log(currentData)

        //create new container to display
        createContainer(i);
        const currentSection = document.querySelector(`#info${i}`);
        // initialize class to style
        currentSection .className = "displayCards";

        //display Quiz cards
        const displayCurrentInfo = displayInfo(currentData, i);
        currentSection .innerHTML = `${displayCurrentInfo}`;

        //create new container for quiz
        createQuizContainer(i);

        const displayCurrentQuiz = await displayQuizQuestion(currentData, i);
        document.querySelector(`#quiz${i}`).innerHTML = `${displayCurrentQuiz}`;

        createExplanationContainer(i);

        const quizBtn = currentSection.querySelector(`#quizBtn${i}`);
        quizBtn.addEventListener("click", function(e){
            e.preventDefault();
            // console.log("weeeeeeeeeee")
            // console.log(currentData)
            // console.log(currentSection)

            //display explanation
            const displayExplanation = displayQuizExplanation(currentData, currentSection)
            document.querySelector(`#expl${i}`).innerHTML = `${displayExplanation}`
            // displayQuizExplanation(currentSection);
            quizBtn.style.display = "none";
        })


    }

})



async function allWrongEffectNames(correctCard){
    const cardsData = await getData("cards");
    let wrongEffectCards = [];

    for(let i =0; i<cardsData.length; i++){
        if (((cardsData[i].type === "Effect")||(cardsData[i].type === "Nullify") )&& (cardsData[i].name !== correctCard)){
            wrongEffectCards.push(cardsData[i].name)
        }
    }
    // console.log("hi")
    // console.log(typeof wrongEffectCards);
    return wrongEffectCards

}

function getWrongChoice(arr, num){
    const position = num % arr.length;
    // console.log(typeof length)
    // console.log(arr[position])
    return arr[position]

}

async function displayQuizQuestion(currentData, i){
    console.log(currentData[2].name);
    const wrongOptions = await allWrongEffectNames(currentData[2].name);
    console.log("hi")
    console.log(wrongOptions)
    const wrongAnswer = getWrongChoice(wrongOptions, currentData[2].id)
    const correctAnswer = currentData[2].name;

    //[correct/wrong, name]
    let even = [];
    let odd = [];

    if (correctAnswer.id % 2 == 0){
        even.push("correct", correctAnswer)
        odd.push("wrong", wrongAnswer)
    }
    else{
        odd.push("correct", correctAnswer)
        even.push("wrong", wrongAnswer)
    }
    
    return `
    <div class="quizLabel">What happens when we mix these two together?</div>
        <div class="quizQuestion">
          <div class="choices">
            <input type="radio" id ="choice${i+1}a" class="choice1" value="${odd[0]}" name="choice">
            <label for="choice${i+1}a" id="choice1space">${odd[1]}</label>

            <input type="radio" id="choice${i+1}b" class="choice2" value="${even[0]}" name="choice">
            <label for="choice${i+1}b">${even[1]}</label>
          </div>
          <div class="quizBtn" id="quizBtn${i}">
            <button>Submit</button>
          </div>
        </div>
    `

}
