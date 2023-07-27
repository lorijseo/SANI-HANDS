

// import {findIcon, findCardId, cardDescription, createCard} from './collection.js'

// createCard = require("./collection")

async function getData(){
    const response = await fetch("data.json");
    const data = await response.json();

    for (let i=0; i<data.combo.length; i++){
        const thisCombo = data.combo[i]
        const getCardInfo = await searchCards(thisCombo.ingredients[0], thisCombo.ingredients[1], thisCombo.outcome);

        //counter for id the index number?

        console.log(getCardInfo);
        //create cards
        const firstCard = await createCard(getCardInfo[0]);
        const secondCard = await createCard(getCardInfo[1]);
        const thirdCard = await createCard(getCardInfo[2]);
        //display cards
            //create element

        // console.log(getCardInfo);
        console.log("wooo");
        // return getCardInfo

    }
    // return allData
}


//fetch cards from names
async function searchCards(name1, name2, name3){
    const cardNames = [name1, name2, name3];
    const response = await fetch("data.json");
    const data = await response.json();
    let saveData = [];
    for (let i=0; i<data.cards.length; i++){
        if (saveData.length == 3){
            return saveData
        }
        else if (cardNames.includes(data.cards[i].name)){
            saveData.push(data.cards[i])
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




function cardDescription(cardData, idName){
    let cardId = "#" + idName; 
    let findCard = document.querySelector(cardId)
    let displayDescr = findCard.querySelector("#cardDescr")
    if (cardData.type == "Ingredient"){
        displayDescr.innerHTML = `



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
        displayDescr.innerHTML = `
            <div class="descr">
            <i class="fa-solid fa-skull-crossbones fa-lg" style="color: orange"></i>
            <span>${cardData.info}</span>
          </div>
        `
    }

    else if ((cardData.type == "Product")||(cardData.type=="Nullify")){
        displayDescr.innerHTML = `
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

function createSupplyContainer(newId){
    //create new element
    let displayCard = document.querySelector(".test");
    let newSupply = document.createElement('div');

    newSupply.id = newId;
    newSupply.className = "displaySupplies"

    displayCard.appendChild(newSupply);
    return newSupply
}

async function createCard(cardData, num){

    // console.log(cardData)
    let cardType = cardData.type;
    // console.log(cardType)
    let formatType = cardType.charAt(0).toLowerCase() + cardType.slice(1);

    // does not consider two worded names, account for underscore
    let formatName = findCardId(cardData)
    let supplyNum = "supply"+num

    //determine icon 
    const getIcon = findIcon(cardData)

    //create new element
    const supplyContainer = createSupplyContainer(supplyNum);

    // ************************************************************************
    //find card description
    // const description = cardDescription(cardData, formatName);

    supplyContainer.innerHTML = `
        <div class="${formatType + "Card"}" id="${formatName}">
        <div class="cardContent">

        <div class="title">
        ${getIcon}
        <span class="${formatType + "Descr"}" id="cardName">${cardData.name}</span>
        </div>

        <img src="${cardData.img}" alt=" style="height=128.42px"  style = "object-fit:contain">
  
        <div class="${formatType + "Descr"}" id="cardDescr">

        </div>
        </div>
    </div>
    `
    //find card description
    cardDescription(cardData, formatName);
};














// searchCards("Vinegar", "Citric Acid", "Chlorine Gas")
// const showThis = getData();


const showBtn = document.querySelector("#showInfo");
showBtn.addEventListener("click", async function(e){
    e.preventDefault();
    getData();
    // const showThis = await getData();
    // document.querySelector(".test").innerHTML = showThis[0].type;
})