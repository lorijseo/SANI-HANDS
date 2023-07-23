
async function getCardData(searchName){
    const response = await fetch("data.json");
    const data = await response.json();
    for (let i=0; data.cards.length; i++){
        if (data.cards[i].name == searchName){
            console.log(data.cards[i])
            createCard(data.cards[i])
        }
    }

}

function findCardId(cardData){
    let cardName = cardData.name;
    if (cardName.indexOf(" ") !== -1){
        let firstWordEnds = cardName.indexOf(" ");
        let firstWord = cardName.charAt(0).toLowerCase() + cardName.slice(1, firstWordEnds);
        let secondWord = cardName.charAt(firstWordEnds + 1).toLowerCase() + cardName.slice(firstWordEnds+2, cardName.length);
        let idName = firstWord + "_" + secondWord;

        // console.log(cardId)
        return idName
    }
    else{
        let idName = cardName.charAt(0).toLowerCase() + cardName.slice(1);
        return idName
    }
}


function createCard(cardData){
    let cardType = cardData.type;
    let formatType = cardType.charAt(0).toLowerCase() + cardType.slice(1);
    // does not consider two worded names, account for underscore
    let formatName = findCardId(cardData)

    let displayCard = document.querySelector(".creation");
    displayCard.innerHTML = `
        <div class="${formatType + "Card"}" id="${formatName}">
        <div class="cardContent">
        <p class="${formatType + "Descr"}" id="cardName"><i class="fa-solid fa-flask" style="color: green;"></i>${cardData.name} </p>
        <img src="${cardData.img}" alt=" style="height=128.42px"  style = "object-fit:contain">
        <p class="${formatType + "Descr"}" id="cardType">${cardType}</p>
        <div class="${formatType + "Descr"}" id="cardDescr">

        </div>
        </div>
    </div>
    `
    cardDescription(cardData, formatName);


}



function cardDescription(cardData, idName){
    let cardId = "#" + idName; 
    let findCard = document.querySelector(cardId)
    let displayDescr = findCard.querySelector("#cardDescr")
    if (cardData.type = "Ingredient"){
        displayDescr.innerHTML = `
            <p><span style="padding-right:5px;"></span> <i class="fa-solid fa-thumbs-up" style="color: green;"></i>  ${cardData.good}</p>
            <p><span style="padding-right:5px;"></span> <i class="fa-solid fa-skull-crossbones" style="color: red"></i>  ${cardData.bad}</p>

        `
    }

    else if (cardData.type == "Effect"){
        displayDescr.innerHTML = `
            <p><span style="padding-right:5px;"></span> <i class="fa-solid fa-skull-crossbones" style="color: red"></i>  Effects: ${cardData.info} </p>
        `
    }

    else if (cardData.type == "Product"){
        displayDescr.innerHTML = `
            <p><span style="padding-right:5px;"></span> <i class="fa-solid fa-skull-crossbones" style="color: red"></i>  Effects: ${cardData.info} </p>
        `
    }

}


let createBtn = document.getElementById("create")

createBtn.addEventListener("click", function(e){
    e.preventDefault();
    getCardData("Baking Soda")
})