
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

function createSupplyContainer(newId){
    //create new element
    let displayCard = document.querySelector(`.mySupplies`);
    let newSupply = document.createElement('div');

    newSupply.id = newId;
    newSupply.className = "displaySupplies"

    displayCard.appendChild(newSupply);
    return newSupply
}

function createCard(cardData, num){

    // console.log(cardData)
    let cardType = cardData.type;
    // console.log(cardType)
    let formatType = cardType.charAt(0).toLowerCase() + cardType.slice(1);

    // does not consider two worded names, account for underscore
    let formatName = findCardId(cardData)
    let supplyNum = "supply"+num

    //determine icon 
    const getIcon = findIcon(cardData)

    const supplyContainer = createSupplyContainer(supplyNum);

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


// const searchBtn = document.getElementById("searchBtn");
// searchBtn.addEventListener("click", async function(e){
//     e.preventDefault();
//     const searchTxt = document.getElementById("search").value;
    
    
//     //REFORMAT INPUT to accept lower case
//     const formattedTxt = await reformatInput(searchTxt);

//     //get card Data
//     const data = await getCardData(formattedTxt);
    
//     //verify if data on name exists
//     if (data){        
//         increaseStorageCounter();
//         let counter = getStorageCountNum();
//         const text = counter.toString();
//         localStorage.setItem(text, JSON.stringify(data));
//         //create Card
//         createCard(data, counter);

//         //create Delete btn
//         createDeleteBtn(counter);
//         displayClearBtn(counter);
//     }
//     else{
//         alert(`We have no data on ${searchTxt}. Try again!`)
//     }
//     document.getElementById("search").value = '';
    
// })


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


// ***************************************************************************

let cardType = document.querySelector("#type");
cardType.addEventListener("change", function(e){
    e.preventDefault();
    document.querySelector("#promptName").style.display="block";
    updateInputForm();
    
});

function updateInputForm(){
    if (document.querySelector("#type").value == ""){
        document.querySelector("#good").disabled = false;
        document.querySelector("#bad").disabled = false;
        document.querySelector("#info").disabled = false;
    }
    else if (document.querySelector("#type").value == "Ingredient"){
        document.querySelector("#good").disabled = false;
        document.querySelector("#bad").disabled = false;
        document.querySelector("#info").disabled = true;
    }
    else{
        document.querySelector("#good").disabled = true;
        document.querySelector("#bad").disabled = true;
        document.querySelector("#info").disabled = false;
    }
}

// const createBtn = document.querySelector("#createBtn");
// createBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     //validate input before creating card
//     const isValid = validateName();

//     if (isValid){
//         increaseStorageCounter();
//         let counter = getStorageCountNum();
//         console.log(counter);
//         const text = counter.toString();
//         const data = createData(counter);

        
//         localStorage.setItem(text, JSON.stringify(data));

        
//         createCard(data, counter);
//         createEditBtn(counter);
//         createDeleteBtn(counter);
        
//         deletePromptData();
//         updateInputForm();
//         displayClearBtn(counter);
//     }
//     else{
//         alert("Invalid Name")
//     }
    
// })


const formBtn = document.querySelector("#createCard");
formBtn.addEventListener("submit", function(e){
    e.preventDefault();
    //validate input before creating card
    const isValid = validateName();
    const isUnique = isUniqueName();

    if (isValid && isUnique){
        increaseStorageCounter();
        let counter = getStorageCountNum();
        if (counter == 1){
            document.querySelector("#mySuppliesTitle").style.display="block";
        }
        // console.log(counter);
        const text = counter.toString();
        const data = createData(counter);

        
        localStorage.setItem(text, JSON.stringify(data));

        
        createCard(data, counter);
        createEditBtn(counter);
        createDeleteBtn(counter);
        
        deletePromptData();
        updateInputForm();
        displayClearBtn(counter);
    }

})

function validateName(){
    const name = document.querySelector("#name").value;
    // returns true if symbols in name
    const fullWord = /[-/:-@[-`{-~]/.test(name)
    if (fullWord){
        alert("Name cannot have any special symbols or characters")
        return false
    }

    // returns false if first character is not a letter
    const firstLetter = /^[a-zA-Z\s]/.test(name.charAt(0))
    if (!firstLetter){
        alert("Name must begin with a letter")
        return false
    }
    return true
}

//returns boolean if name exists the given number of times
//when creating, the name should not exist
//when editing, the name should exists once
function isUniqueName(){
    const newName = document.querySelector("#name").value;
    const counterNum = getStorageCountNum();

    if (counterNum>0){
        let count = 0
        for (let i =1; i<=counterNum; i++){
        
            if (localStorage.getItem(i.toString())){
                // get the object value
                const cardData = JSON.parse(localStorage.getItem(i.toString()));
 
                // verify search card or created card
                const cardName = cardData.name;
                if (cardName == newName){
                    count +=1;
                }
            }
        }


        if (count >0){
            alert(`${newName} already exists. Try a different name`)
            return false
        }
    }
    return true;
}

function isUniqueEditName(){
    const newName = document.querySelector("#name").value;
    const counterNum = getStorageCountNum();

    if (counterNum >0){
        //name isn't edited
        let count = 0;
        for (let i =1; i<=counterNum; i++){
    
            if (localStorage.getItem(i.toString())){
                // get the object value
                const cardData = JSON.parse(localStorage.getItem(i.toString()));
 deletebtn
                // verify search card or created card
                const cardName = cardData.name;
                if (cardName == newName){
                    count +=1;
                }
            }
        }
        // console.log(count);
        // console.log(localStorage.getItem("edit_name"));
        if ((count == 1) && (localStorage.getItem("edit_name") == newName)){
            return true
        }
        else if (count >0){
            alert(`${newName} already exists. Try a different name`)
            return false
        }

    }

    

}

function createDeleteBtn(cardId){
    const makeId = "#supply" + cardId;
    const findCard = document.querySelector(makeId);
    const btn = document.createElement('button');

    btn.id = "deleteBtn";
    btn.innerHTML = `<i class="fa-solid fa-trash-can" style="color: red"></i>`;
    findCard.appendChild(btn);

    btn.addEventListener("click", function(){
        findCard.remove();
        localStorage.removeItem(cardId);
        decreaseStorageCounter();
        const counter = getStorageCountNum();
        displayClearBtn(counter);
        if (counter == 0){
            document.querySelector("#mySuppliesTitle").style.display="none";
        }


    })

}



function createData(num){
    const type = document.querySelector("#type").value;
    const name = document.querySelector("#name").value;
    const good = document.querySelector("#good").value;
    const bad = document.querySelector("#bad").value;
    const info = document.querySelector("#info").value;

    const text = num.toString();

    let data = {
        "id": "user" + num,
        "name": name,
        "type": type,
        "good": good,
        "bad": bad,
        "info": info,
        "img": "cardImages/product_icon.png"
    }

    localStorage.setItem(text, JSON.stringify(data));
    return data
}

function displayInputValues(num){
    const text = num.toString();
    let storageData = JSON.parse(localStorage.getItem(text));

    document.querySelector("#type").value = storageData.type
    document.querySelector("#name").value = storageData.name;
    document.querySelector("#good").value = storageData.good;
    document.querySelector("#bad").value = storageData.bad;
    document.querySelector("#info").value = storageData.info;

}

function createEditBtn(num){
    const makeId = "#supply" + num;
    const findCard = document.querySelector(makeId);
    const btn = document.createElement('button');
    // const makeBtnId = "editBtn" + num

    // btn.id = makeBtnId
    // btn.className = "editBtn";
    btn.id = "editBtn"
    btn.innerHTML = `<i class="fa-solid fa-pen" style="color: grey"></i>`;
    findCard.appendChild(btn);

    btn.addEventListener("click", function(e){
        displayInputValues(num);
        // let cardType = document.querySelector("#type");
        if (document.querySelector("#type").value == "Ingredient"){
            document.querySelector("#good").disabled = false;
            document.querySelector("#bad").disabled = false;
            document.querySelector("#info").disabled = true;
        }
        else{
            document.querySelector("#good").disabled = true;
            document.querySelector("#bad").disabled = true;
            document.querySelector("#info").disabled = false;
        }
    
        document.querySelector("#createBtn").style.display = "none";
        document.querySelector("#saveChangeBtn").style.display = "inline-block";
        document.querySelector("#saveChangeBtn").className = num;

        document.querySelector("#noChangeBtn").style.display = "inline-block";

        //save name value so it's not duplicated again
        const nameOfEdit = document.querySelector("#name").value; 
        localStorage.setItem("edit_name", nameOfEdit);
    
    })
    
}

const cancelBtn = document.querySelector("#noChangeBtn");
cancelBtn.addEventListener("click", function(e){
    e.preventDefault();
    deletePromptData();
    updateInputForm();
    document.querySelector("#createBtn").style.display = "block";
    document.querySelector("#saveChangeBtn").style.display = "none";
    document.querySelector("#noChangeBtn").style.display = "none";

})


let saveChangeBtn = document.querySelector("#saveChangeBtn");
saveChangeBtn.addEventListener("click", function(e){
    e.preventDefault();
    const isValid = validateName();
    const isUnique = isUniqueEditName();
    // const isValid = true;
    const num = saveChangeBtn.className;
    
    if (isValid && isUnique){
        // saves updated data into local storage
        const data = createData(num);

        editCard(data, num);
        createEditBtn(num);
        createDeleteBtn(num);
        
        deletePromptData();
        updateInputForm();


        document.querySelector("#createBtn").style.display = "block";
        document.querySelector("#saveChangeBtn").style.display = "none";
        document.querySelector("#noChangeBtn").style.display = "none";
    }
    // else{
    //     alert("Invalid Name")
    // }

    //return back to displaying create button and hiding other buttons and clearing input
})



function deletePromptData(){
    document.querySelector("#type").value = "";
    document.querySelector("#name").value= "";
    document.querySelector("#good").value= "";
    document.querySelector("#bad").value= "";
    document.querySelector("#info").value= "";
}

function editCard(cardData, num){
    let cardType = cardData.type;
    let formatType = cardType.charAt(0).toLowerCase() + cardType.slice(1);

    // does not consider two worded names, account for underscore
    let formatName = findCardId(cardData)
    let supplyNum = "supply"+num

    //determine icon 
    const getIcon = findIcon(cardData)

    //findsupplycontainer
    const supplyContainer = findSupplyContainer(supplyNum);

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
}

function findSupplyContainer(currentId){
    const id= `#${currentId}`
    console.log(id);
    let currentCard = document.querySelector(`#${currentId}`);
    console.log(currentCard);
    currentCard.innerHTML = "";
    return currentCard

}

const clearBtn = document.querySelector("#clearSupplies");
clearBtn.addEventListener("click", function(e){
    e.preventDefault();
    localStorage.clear();
    document.querySelector(".mySupplies").innerHTML = "";
    document.querySelector("#mySuppliesTitle").style.display="none";
    this.style.display = "none";

})

let emptyStorage = true;
window.addEventListener("DOMContentLoaded", function(){
    const counterNum = getStorageCountNum();
    if (counterNum){
        for (let i =1; i<=counterNum; i++){
        
            if (this.localStorage.getItem(i.toString())){
                // get the object value
                const cardData = JSON.parse(this.localStorage.getItem(i.toString()));
 
                // verify search card or created card
                const determineCard = cardData.id;

                if (typeof determineCard === "string"){
                    //created card
                    createCard(cardData, i);
                    createEditBtn(i);
                    createDeleteBtn(i);
                    
                }
                else{
                    //searched card
                    createCard(cardData,i);
                    createDeleteBtn(i)

                }
                emptyStorage = false;
                this.document.querySelector("#mySuppliesTitle").style.display="block";
                
                
            }
        }
        //consider if cards were deleted manually by user
        if (emptyStorage){
            this.localStorage.setItem("counter", "0")
        }
        displayClearBtn(counterNum);
    }

    //initialize counter to 0 if counter doesn't exist
    else{
        this.localStorage.setItem("counter", "0");
        displayClearBtn(counterNum);
    }
})

function increaseStorageCounter(){
    let countValue = JSON.parse(localStorage.getItem("counter"));
    let count = Number(countValue) + 1;
    let updateCount = count.toString();
    localStorage.setItem("counter", updateCount);
}

function decreaseStorageCounter(){
    let countValue = JSON.parse(localStorage.getItem("counter"));
    let count = Number(countValue) - 1;
    let updateCount = count.toString();
    localStorage.setItem("counter", updateCount);
}
function getStorageCountNum(){
    let countValue = JSON.parse(localStorage.getItem("counter"));
    let num = Number(countValue)
    return num
}

function displayClearBtn(counter){
    if (counter > 0){
        document.querySelector("#clearSupplies").style.display = "inline-block";
    }
    else{
        document.querySelector("#clearSupplies").style.display = "none";
    }
}