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
        <div class="descr">
        <i class="fa-solid fa-circle-info fa-lg" style="color: purple"></i>
        <span>${cardData.info}</span>
      </div>
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

function createInfoTitle(data){
    const card1 = data[0].name;
    const card2 = data[1].name;

    return`
    <div class="infoDescr">${card1} & ${card2}</div>`
}

function createExplanation(explanation){
    return `      <div class="cardsInfo">
    <p>${explanation}</p>
  </div>`

}

function displayInfo(data){
    const title = createInfoTitle(data);
    const card1 = createCard(data[0]);
    const card2 = createCard(data[1]);
    const card3 = createCard(data[2]);
    const explanation = createExplanation(data[3]);

    // document.querySelector(".test").innerHTML = `${show}`

    return `
    ${title} ${card1} <p id="plus">+</p> ${card2} <p id="equal">=</p> ${card3} ${explanation} `

}

//param: num
function createCard(cardData){
    // console.log(cardData)
    let cardType = cardData.type;
    let formatType = cardType.charAt(0).toLowerCase() + cardType.slice(1);

    // does not consider two worded names, account for underscore
    let formatName = findCardId(cardData)
    // let supplyNum = "supply"+num

    //determine icon 
    const getIcon = findIcon(cardData);

    const description = cardDescription(cardData);

    return `
        <div class="${formatType + "Card"}" id="${formatName}">
        <div class="cardContent">

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



// const showBtn = document.querySelector("#showInfo");
// showBtn.addEventListener("click", async function(e){
//     e.preventDefault();
//     libraryBtn.style.display = "inline-block";
//     document.querySelector("#showInfoTitle").style.display = "block";
//     document.querySelector("#seeAllTitle").style.display = "none";
//     this.style.display = "none";
//     // libraryBtn.disabled = false;
//     // showBtn.disabled = true;
//     document.querySelector(".userDisplay").innerHTML = "";
//     const comboData = await getData("combo");

//     const allCardsData = await allCards(comboData);
//     // console.log(allCardsData);

//     for (let i=0; i<allCardsData.length; i++){
//         const currentData = allCardsData[i];

//         //create new container to display
//         createContainer(i);
//         // initialize class to style
//         document.querySelector(`#info${i}`).className = "displayCards";

//         const displayCurrentInfo = displayInfo(currentData);
//         document.querySelector(`#info${i}`).innerHTML = `${displayCurrentInfo}`

//     }

// })

const libraryBtn = document.querySelector("#seeAll");
libraryBtn.addEventListener("click", async function(e){
    e.preventDefault();
    // showBtn.style.display = "inline-block";
    // document.querySelector("#showInfoTitle").style.display = "none";
    // document.querySelector("#seeAllTitle").style.display = "block";
    this.style.display = "none";
    // libraryBtn.disabled = true;
    // showBtn.disabled = false;
    document.querySelector(".userDisplay").innerHTML = "";
    const cardsData = await getData("cards");

    for (let i=0; i<cardsData.length; i++){
        const currentData = cardsData[i];
        createContainer(i);
        document.querySelector(`#info${i}`).className = "myLibrary";
        const displayCurrentCard = createCard(currentData);
        document.querySelector(`#info${i}`).innerHTML = `${displayCurrentCard}`

    }

})

window.addEventListener("load", async function(){
    // libraryBtn.disabled = true;
    // document.querySelector("#showInfoTitle").style.display = "none";
    // document.querySelector("#seeAllDisplay").style.display = "block";
    const cardsData = await getData("cards");

    const displayCardNumber = document.querySelector("#numOfCards");
    displayCardNumber.innerHTML = `
    We currently have <b>${cardsData.length}</b> chemical cards in our database
    `
    for (let i=0; i<cardsData.length; i++){
        const currentData = cardsData[i];
        createContainer(i);
        document.querySelector(`#info${i}`).className = "myLibrary";
        const displayCurrentCard = createCard(currentData);
        document.querySelector(`#info${i}`).innerHTML = `${displayCurrentCard}`

    }

})

function reformatInput(searchInput){
    let lowerCase = searchInput.toLowerCase();
    let upperFirstWord = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1,lowerCase.length);

    // consider if there is at least one space in the name
    if (upperFirstWord.indexOf(" ") !== -1){
        let upperNextWord = upperFirstWord;

        for (let i=0;i<upperFirstWord.length;i++){
            if (upperFirstWord[i] === " "){
                upperNextWord = upperFirstWord.slice(0,i+1) + upperFirstWord.charAt(i+1).toUpperCase() + upperFirstWord.slice(i+2);
                upperFirstWord = upperNextWord;
            }
        }
        return upperNextWord;
    }
    return upperFirstWord;
}

async function getCardData(findName){
    // const searchValue = searchTxt.value;
    const response = await fetch("data.json");
    const data = await response.json();
    for (let i=0; i<data.cards.length; i++){
        try{
            if (data.cards[i].name == findName){
                console.log(data.cards[i])
                return data.cards[i]
            }
        }
        catch{
            alert(`We do not have ${findName} in our library! Try again`)
            return false
        }

    }
}

function increaseStorageCounter(){
    let countValue = JSON.parse(localStorage.getItem("counter"));
    let count = Number(countValue) + 1;
    let updateCount = count.toString();
    localStorage.setItem("counter", updateCount);
}

// function decreaseStorageCounter(){
//     let countValue = JSON.parse(localStorage.getItem("counter"));
//     let count = Number(countValue) - 1;
//     let updateCount = count.toString();
//     localStorage.setItem("counter", updateCount);
// }
function getStorageCountNum(){
    let countValue = JSON.parse(localStorage.getItem("counter"));
    let num = Number(countValue)
    return num
}


const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", async function(e){
    e.preventDefault();
    
    const searchTxt = document.getElementById("search").value;
     
    //REFORMAT INPUT to accept lower case
    const formattedTxt = await reformatInput(searchTxt);

    //get card Data
    const data = await getCardData(formattedTxt);
    
    //verify if data on name exists
    if (data){       
        document.querySelector("#seeAll").style.display = "inline-block"; 
        //create Card
        const card = createCard(data);
        document.querySelector(".userDisplay").innerHTML = `${card}`
    }
    else{
        alert(`We have no data on ${searchTxt}. Try again!`)
    }
    document.getElementById("search").value = '';
    
})

