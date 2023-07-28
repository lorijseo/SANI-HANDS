
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

    //create new element
    // let displayCard = document.querySelector(".mySupplies");
    // let newSupply = document.createElement('div');

    // newSupply.id = supplyNum;
    // newSupply.className = "displaySupplies"

    // displayCard.appendChild(newSupply);

    const supplyContainer = createSupplyContainer(supplyNum, parent );

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


const searchBtn = document.getElementById("searchBtn");
let counter = 0

searchBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const searchTxt = document.getElementById("search").value;
    
    // console.log(counter)
    // console.log(searchTxt);
    
    //REFORMAT INPUT to accept lower case
    const formattedTxt = await reformatInput(searchTxt);
    // console.log(formattedTxt);


    //get card Data
    const data = await getCardData(formattedTxt);
    
    //verify if data on name exists
    if (data){
        counter += 1;
        //create Card
        createCard(data, counter);

        //create Delete btn
        createDeleteBtn(counter);


    }
    document.getElementById("search").value = '';

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


// ***************************************************************************

let cardType = document.querySelector("#type");
cardType.addEventListener("change", function(e){
    e.preventDefault();
    document.querySelector("#promptName").style.display="block";
    if (document.querySelector("#type").value === "Ingredient"){
        document.querySelector("#good").disabled = false;
        document.querySelector("#bad").disabled = false;
        document.querySelector("#info").disabled = true;
    }
    else{
        document.querySelector("#good").disabled = true;
        document.querySelector("#bad").disabled = true;
        document.querySelector("#info").disabled = false;
    }
    
});

const createBtn = document.querySelector("#createBtn");
createBtn.addEventListener("click", function(e){
    e.preventDefault();
    //validate input before creating card
    const isValid = validateName();

    if (isValid){
        counter +=1;
        const data = createData(counter);
        createCard(data, counter);
        createDeleteBtn(counter);
        createEditBtn(counter);
        deletePromptData();
    }
    else{
        alert("Invalid Name")
    }


})

function validateName(){
    const name = document.querySelector("#name").value;
    const isValidName = /^[a-z,A-Z]/.test(name.charAt(0))
    return isValidName
}


function createData(num){
    const type = document.querySelector("#type").value;
    const name = document.querySelector("#name").value;
    const good = document.querySelector("#good").value;
    const bad = document.querySelector("#bad").value;
    const info = document.querySelector("#info").value;

    const text = num.toString();

    let data = {
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

function createDeleteBtn(cardId){
    const makeId = "#supply" + cardId;
    const findCard = document.querySelector(makeId);
    const btn = document.createElement('button');

    btn.id = "deleteBtn";
    btn.innerHTML = `<i class="fa-solid fa-trash-can" style="color: red"></i>`;
    findCard.appendChild(btn);

    btn.addEventListener("click", function(e){
        findCard.remove();

    })

}

// function createEditBtn(data,cardId){
//     const makeId = "#supply" + cardId;
//     const findCard = document.querySelector(makeId);
//     const btn = document.createElement('button');

//     btn.id = "editBtn";
//     btn.innerHTML = `<i class="fa-solid fa-pen" style="color: grey"></i>`;
//     findCard.appendChild(btn);

//     btn.addEventListener("click", function(e){
//         const dropdown = document.querySelector("#type");

//         for(let i=0; i<dropdown.length; i++){
//             // START HERE*********************
//             console.log(dropdown.options[i].value)
//         }
//         document.querySelector("#type").selectedIndex = 1;
//         document.querySelector("#name").value = data.name;
//         document.querySelector("#good").value = data.good;
//         document.querySelector("#bad").value = data.bad;
//         document.querySelector("#info").value = data.info;

//     })

// }

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

    btn.id = "editBtn";
    btn.innerHTML = `<i class="fa-solid fa-pen" style="color: grey"></i>`;
    findCard.appendChild(btn);

    btn.addEventListener("click", function(e){
        displayInputValues(num);

        const saveChangeBtn = document.querySelector("#saveChangeBtn");
        saveChangeBtn.addEventListener("click", function(e){
            const isValid = validateName();
            if (isValid){
                // saves updated data into local storage
                const data = createData(num);
                // document.querySelector(`#supply${num}`).innerHTML= ``;
                //cannot remove, we must replace it
                createCard(data, num);
                //***must include buttons */
                createDeleteBtn(num);
                createEditBtn(num);
                deletePromptData();
                //fetch our card
                //get data from local storage and replace it
                document.querySelector("#createBtn").style.display = "block";
                document.querySelector("#saveChangeBtn").style.display = "none";
                document.querySelector("#noChangeBtn").style.display = "none";
            }
            else{
                alert("Invalid Name")
            }

            //return back to displaying create button and hiding other buttons and clearing input
        })



        //change createcardBtn to saveChanges or nvm
        document.querySelector("#createBtn").style.display = "none";
        document.querySelector("#saveChangeBtn").style.display = "block";
        document.querySelector("#noChangeBtn").style.display = "block";



        //save Change will overwrite previous Card

        //nvm will empty inputs, 

    })

}

// const saveChangeBtn = document.querySelector("#saveChangeBtn");
// saveChangeBtn.addEventListener("click", function(e){
//     createData(num);
// })


function deletePromptData(){
    document.querySelector("#type").value = "";
    document.querySelector("#name").value= "";
    document.querySelector("#good").value= "";
    document.querySelector("#bad").value= "";
    document.querySelector("#info").value= "";
}

// export {findIcon, findCardId, cardDescription, createCard};