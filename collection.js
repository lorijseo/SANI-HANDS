
async function getCardData(searchName, num){
    // const searchValue = searchTxt.value;
    const response = await fetch("data.json");
    const data = await response.json();
    for (let i=0; data.cards.length; i++){
        if (data.cards[i].name == searchName){
            console.log(data.cards[i])
            createCard(data.cards[i],num)
            //delete btn for searched cards
            createDeleteBtn(num);
        }
    }
    console.log("doesn't exist!!!!")

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



function cardDescription(cardData, idName){
    let cardId = "#" + idName; 
    let findCard = document.querySelector(cardId)
    let displayDescr = findCard.querySelector("#cardDescr")
    if (cardData.type == "Ingredient"){
        displayDescr.innerHTML = `
            <p><span style="padding-right:5px;"></span> <i class="fa-solid fa-thumbs-up" style="color: green;"></i>&nbsp${cardData.good}</p>
            <p><span style="padding-right:5px;"></span> <i class="fa-solid fa-skull-crossbones" style="color: red"></i>&nbsp${cardData.bad}</p>

        `
    }

    else if (cardData.type == "Effect"){
        displayDescr.innerHTML = `
            <p><span style="padding-right:5px;"></span> <i class="fa-solid fa-skull-crossbones" style="color: red"></i>&nbsp${cardData.info} </p>
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
        return '<i class="fa-solid fa-flask" style="color: green;"></i>'
    }

    else if (cardType == "Effect"){
        return '<i class="fa-solid fa-biohazard" style="color: #cc350f;"></i>'
    }

    else if (cardType == "Product"){
        return '<i class="fa-solid fa-spray-can-sparkles" style="color: #2f72e4;"></i>'
    }

    else if (cardType == "Nullify"){
        return '<i class="fa-solid fa-poo" style="color: #717d94;"></i>'
    }

}

function createCard(cardData, num){
    let cardType = cardData.type;
    let formatType = cardType.charAt(0).toLowerCase() + cardType.slice(1);
    // does not consider two worded names, account for underscore
    let formatName = findCardId(cardData)
    let supplyNum = "supply"+num

    //determine icon 
    const getIcon = findIcon(cardData)

    //create new element
    let displayCard = document.querySelector(".mySupplies");
    let newSupply = document.createElement('div');

    newSupply.id = supplyNum;
    newSupply.className = "displaySupplies"

    displayCard.appendChild(newSupply);

    newSupply.innerHTML = `
        <div class="${formatType + "Card"}" id="${formatName}">
        <div class="cardContent">
        <p class="${formatType + "Descr"}" id="cardName">${getIcon}&nbsp${cardData.name} </p>
        <img src="${cardData.img}" alt=" style="height=128.42px"  style = "object-fit:contain">
        <p class="${formatType + "Descr"}" id="cardType">${cardType}</p>
        <div class="${formatType + "Descr"}" id="cardDescr">

        </div>
        </div>
    </div>
    `

    // newSupply.innerHTML = `
    //     <div class="displaySupplies" id="${supplyNum}">
    //     <div class="${formatType + "Card"}" id="${formatName}">
    //     <div class="cardContent">
    //     <p class="${formatType + "Descr"}" id="cardName"><i class="fa-solid fa-flask" style="color: green;"></i>${cardData.name} </p>
    //     <img src="${cardData.img}" alt=" style="height=128.42px"  style = "object-fit:contain">
    //     <p class="${formatType + "Descr"}" id="cardType">${cardType}</p>
    //     <div class="${formatType + "Descr"}" id="cardDescr">

    //     </div>
    //     </div>
    // </div></div>
    // `
    cardDescription(cardData, formatName);


}


const searchBtn = document.getElementById("searchBtn");

let counter = 0
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    const searchTxt = document.getElementById("search").value;
    counter += 1;
    console.log(counter)
    console.log(searchTxt);
    getCardData(searchTxt, counter);
    
    document.getElementById("search").value = '';
})




// ***************************************************************************

let cardType = document.querySelector("#type");
cardType.addEventListener("change", function(e){
    e.preventDefault();
    document.querySelector("#promptName").style.display="block";
    if (document.querySelector("#type").value === "Ingredient"){
        document.querySelector("#promptGoodBad").style.display="block";
        document.querySelector("#promptInfo").style.display="none";
    }
    else{
        document.querySelector("#promptInfo").style.display="block";
        document.querySelector("#promptGoodBad").style.display="none";
    }
    
});

const createBtn = document.querySelector("#createBtn");
createBtn.addEventListener("click", function(e){
    e.preventDefault();
    const data = createData();
    counter +=1;
    createCard(data, counter);
    createDeleteBtn(counter);
    deletePromptData();

})



function createData(){
    const type = document.querySelector("#type").value;
    const name = document.querySelector("#name").value;
    const good = document.querySelector("#good").value;
    const bad = document.querySelector("#bad").value;
    const info = document.querySelector("#info").value;

    let data = {
        "name": name,
        "type": type,
        "good": good,
        "bad": bad,
        "info": info,
        "img": "cardImages/product_icon.png"
    }
    return data
}

function createDeleteBtn(cardId){
    const makeId = "#supply" + cardId;
    const findCard = document.querySelector(makeId);
    const btn = document.createElement('button');

    btn.id = "deleteBtn";
    btn.innerHTML = "DELETE";
    findCard.appendChild(btn);

    btn.addEventListener("click", function(e){
        findCard.remove();

    })

}




function deletePromptData(){
    document.querySelector("#type").value = "";
    document.querySelector("#name").value= "";
    document.querySelector("#good").value= "";
    document.querySelector("#bad").value= "";
    document.querySelector("#info").value= "";
}