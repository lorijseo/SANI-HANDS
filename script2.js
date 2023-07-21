// function createCard(name,type,good,bad,effect,info){



// }
async function getCardData(searchName){
    console.log("weee")
    const response = await fetch("data.json");
    const data = await response.json();
    for (let i=0; data.cards.length; i++){
        if (data.cards[i].name == searchName){
            console.log(data.cards[i])
            createCard(data.cards[i])
        }
    }

}

function createCard(cardData){
    let cardType = cardData.type;
    let cardName = cardData.name;
    let formatType = cardType.charAt(0).toLowerCase() + cardType.slice(1);
    let formatName = cardName.charAt(0).toLowerCase() + cardName.slice(1);
    console.log(formatType)

    let displayCard = document.querySelector(".creation");
    displayCard.innerHTML = `
        <div class="${formatType + "Card"}" id="${formatName}">
        <div class="cardContent">
        <p class="${formatType + "Descr"}" id="cardName"><i class="fa-solid fa-flask" style="color: green;"></i>${cardName} </p>
        <img src="images/product.jpg" alt="">
        <p class="${formatType + "Descr"}" id="cardType">${cardType}</p>
        <div class="${formatType + "Descr"}" id="cardDescr">

        </div>
        </div>
    </div>
    `
    cardDescription(cardData, formatName);


}

function cardDescription(cardData, name){
    let cardId = "#" + name; 
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

// function displayCard(cardData, )

let createBtn = document.getElementById("create")

createBtn.addEventListener("click", function(e){
    e.preventDefault();
    getCardData("Vinegar")


})