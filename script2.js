// function createCard(name,type,good,bad,effect,info){



// }
async function createCard(searchName){
    console.log("weee")
    const response = await fetch("data.json");
    const data = await response.json();
    for (let i=0; data.cards.length; i++){
        if (data.cards[i].name == searchName){
            console.log(data.cards[i])
        }
    }

}

createCard("Vinegar")

// let createBtn = document.getElementById("create")

// createBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     createCard(data);

// })