var $j = jQuery.noConflict();

$j(".owl-carousel").each(function(){
    $j(this).owlCarousel({
        loop:true,
        margin:10,
        // nav:true,
        mouseDrag:true,
        // autoplay:true,
        // autoplayTimeout: 3000,
        dots:true,
        stagePadding:50,
        pagination : false,
        lazyLoad:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4
            },
            1200:{
                items:6
            }
        }
    });
  });

//jquery runs after document is loaded


// $j(function($){
//     $('#trendTodayOwl').owlCarousel({
//         loop:true,
//         margin:10,
//         // nav:true,
//         mouseDrag:true,
//         // autoplay:true,
//         // autoplayTimeout: 3000,
//         dots:true,
//         stagePadding:50,
//         responsive:{
//             0:{
//                 items:1
//             },
//             600:{
//                 items:3
//             },
//             1000:{
//                 items:8
//             }
//         }
//     });
// });

document.querySelector('#topBtn').addEventListener('click', function(e){
    e.preventDefault();
    window.scrollTo(0,0);
})


$j(function(){

        $j("#dialog-message" ).dialog({
        modal: true,
        autoOpen:false,
        buttons: [
            {
                id: "cancel-button",
                // text: "byebye",
                // showText: false,
                // icons: {primary: "ui-icon-heart"},
                click: function() {
                    $j( this ).dialog( "close" );}
            }

        ],
        width: 740,
        //prevents lag
        // draggable:false,
        show: {
          effect: "fade",
          duration: 1000
        },
        hide: {
          effect: "fade",
          duration: 1000
        }
    });


    $j( "#cancel-button" ).html('<i class="fa-solid fa-circle-xmark fa-xl"></i>')

})


// $j(function(){

//     $j("#dialog-subscription" ).dialog({
//     modal: true,
//     autoOpen:false,
//     buttons: [
//         {
//             id: "cancel-button-sub",
//             // text: "byebye",
//             // showText: false,
//             // icons: {primary: "ui-icon-heart"},
//             click: function() {
//                 $j( this ).dialog( "close" );}
//         }

//     ],
//     width: 740,
//     //prevents lag
//     // draggable:false,
//     show: {
//       effect: "fade",
//       duration: 1000
//     },
//     hide: {
//       effect: "fade",
//       duration: 1000
//     }
// });


// $j( "#cancel-button-sub" ).html('<i class="fa-solid fa-circle-xmark fa-xl"></i>')

// })


// async function getTrendweek(){
//     const response = await fetch(`http://localhost:4000/moviedata/trendweek`);
//     const data = await response.json();
//     return data
// }

// async function getTrendday(){
//     const response = await fetch(`http://localhost:4000/moviedata/trendday`);
//     const data = await response.json();
//     return data

// }

// displays 12 romance movies
const romanceBtn = document.getElementById("romance");
romanceBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});
async function getRomance(){
    const response = await fetch(`http://localhost:4000/moviedata/romance`);
    const data = await response.json();
    return data

}

// displays 12 horror movies
const horrorBtn = document.getElementById("horror");
horrorBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});
async function getHorror(){
    const response = await fetch(`http://localhost:4000/moviedata/horror`);
    const data = await response.json();
    return data
}





// ====================================================================================================




// const actionBtn = document.getElementById("action");
// actionBtn.addEventListener("click", async function(e){
//     e.preventDefault();
//     //genre
//     const genreCode = 28;
//     const pageNum = 1

//     //location code
//     const location = getLocation();
//     const locationCode = location.country_code;

//     const selectedMovies = await getMovieData(genreCode,locationCode,pageNum);

//     displayMovieContainer(selectedMovies);
//     addMovieRoutes();
// });



// async function getMovieData(genreCode, locationCode, pageNum){
//     //initialize
//     // let page = 1;

//     // verify if user has saved subscriptions to filter by
//     const providerArr = retrieveSubscriptionsStorage();
//     const providerList = formatProviderParam(providerArr);


//     let selectedMovies = []
//     const numOfMovies = 20
//     while (selectedMovies.length<=numOfMovies){
//         const data = await getMoviesByFilter(providerList, locationCode, pageNum);
//         for(let i =0; i<data.results.length; i++){
//             const genreArr = data.results[i].genre_ids;
//             if (selectedMovies.length == numOfMovies){
//                 return selectedMovies
//             }
//             else if (genreArr.includes(genreCode)){
//                 selectedMovies.push(data.results[i]); 
//             }
//         }
//         pageNum +=1;
//         console.log(selectedMovies.length);
//         console.log(pageNum)
//     }
    
//     return selectedMovies

// }
// ====================================================================================================

// const initialValues = [0,1];
const actionBtn = document.getElementById("action");
actionBtn.addEventListener("click", async function(e,){
    e.preventDefault();
    //genre
    const genreCode = 28;
    let pageNum = 1;
    let startEl = 0;

    //location code
    const location = getLocation();
    const locationCode = location.country_code;

    // verify if user has saved subscriptions to filter by
    const providerArr = retrieveSubscriptionsStorage();
    const providerList = formatProviderParam(providerArr);

    const searchLimit = 10;
    let counter = 0;
    while ((counter < searchLimit)){
        // [movielist, current page num, last el pushed]
        const selectedMovies = await getMovieData(genreCode, providerList, locationCode, pageNum, startEl);

        if (selectedMovies[0].length == 0){
            alert("EMPTY NO MORE");
            break
        }

        else if (selectedMovies[0].length == 10){
            counter += 1;
            
            displayMovieContainer(selectedMovies[0],selectedMovies[0].length,counter);  

            if (counter !== searchLimit){
                if (counter == 1){
                    //initialize movie routes for first page only
                    addGenreMovieRoutes(1);
                }
                pageNum = selectedMovies[1];
                startEl = selectedMovies[2]; // consider if it's the last element of the page
                
                createNextBtn(counter);
                createPrevBtn(counter);
                notReadyBtn(counter);               
            }
            else if(counter == searchLimit){
                createPrevBtn(counter);
            }

        }
        
        //display remaining movies that did not reach 10
        else if ((selectedMovies[0].length > 0)&&(selectedMovies[1] == 0)){

            counter += 1;
            displayMovieContainer(selectedMovies[0], selectedMovies[0].length, counter);
            if (counter == 1){
                //initialize movie routes for first page only
                addGenreMovieRoutes(1);
            }
            else {
                //last page needs prev button
                createNextBtn(counter);
                createPrevBtn(counter);
            }
            
            break
        }

    }

});



async function getMovieData(genreCode, providerList, locationCode, pageNum, startEl){
    let selectedMovies = []

    while ((selectedMovies.length <= 10)){
        const data = await getMoviesByFilter(providerList, locationCode, pageNum);
        for(let i =startEl; i<data.results.length; i++){
            const genreArr = data.results[i].genre_ids;
            if (selectedMovies.length == 10){
                // [movielist, current page num, last el pushed]
                return [selectedMovies, pageNum, i]
            }
            else if (genreArr.includes(genreCode)){
                selectedMovies.push(data.results[i]); 
            }
        }
        console.log(pageNum)
        pageNum +=1;
        // console.log(selectedMovies.length);
        if (pageNum >50){
            console.log(selectedMovies);
            return [selectedMovies, 0, 0]
        }
        
    }
    console.log("didn't think i can reach here. check your code");
    return
}

// ====================================================================================================


// displays 12 action movies
// const actionBtn = document.getElementById("action");
// actionBtn.addEventListener("click", async function(e){
//     e.preventDefault();
//     const genre = this.getAttribute("id")
//     const data = await getMovieApi(genre)
//     displayMovieContainer(data);
//     addMovieRoutes();
// });


async function getAction(){
    const response = await fetch(`http://localhost:4000/moviedata/action`);
    const data = await response.json();
    return data

}

// displays 12 adventure movies
const adventureBtn = document.getElementById("adventure");
adventureBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});
async function getAdventure(){
    const response = await fetch(`http://localhost:4000/moviedata/adventure`);
    const data = await response.json();
    return data

}

// displays 12 animation movies
const animationBtn = document.getElementById("animation");
animationBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});
async function getAnimation(){
    const response = await fetch(`http://localhost:4000/moviedata/animation`);
    const data = await response.json();
    return data
}

// displays 12 comedy movies
const comedyBtn = document.getElementById("comedy");
comedyBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id");
    const data = await getMovieApi(genre);
    console.log(data);
    displayMovieContainer(data);
    addMovieRoutes();
});

async function getComedy(){
    const response = await fetch(`http://localhost:4000/moviedata/comedy`);
    const data = await response.json();
    return data

}

//displays 12 documentary movies
const documentaryBtn = document.getElementById("documentary");
documentaryBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id");
    const data = await getMovieApi(genre);
    console.log(data);
    displayMovieContainer(data);
    addMovieRoutes();
});

async function getDocumentary(){
    const response = await fetch(`http://localhost:4000/moviedata/documentary`);
    const data = await response.json();
    return data

}

//displays 12 drama movies
const dramaBtn = document.getElementById("drama");
dramaBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});
async function getDrama(){
    const response = await fetch(`http://localhost:4000/moviedata/drama`);
    const data = await response.json();
    return data

}

//displays 12 family movies
const familyBtn = document.getElementById("family");
familyBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});


async function getFamily(){
    const response = await fetch(`http://localhost:4000/moviedata/family`);
    const data = await response.json();
    return data

}

//displays 12 fantasy movies
const fantasyBtn = document.getElementById("fantasy");
fantasyBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});


async function getFantasy(){
    const response = await fetch(`http://localhost:4000/moviedata/fantasy`);
    const data = await response.json();
    return data
}

//displays 12 history movies
const historyBtn = document.getElementById("history");
historyBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});

async function getHistory(){
    const response = await fetch(`http://localhost:4000/moviedata/history`);
    const data = await response.json();
    return data

}

//displays 12 music movies
const musicBtn = document.getElementById("music");
musicBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
})

async function getMusic(){
    const response = await fetch(`http://localhost:4000/moviedata/music`);
    const data = await response.json();
    return data
}

//displays 12 mystery movies
const mysteryBtn = document.getElementById("mystery");
mysteryBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
})

// async function getMystery(){
//     const response = await fetch(`http://localhost:4000/moviedata/mystery`);
//     const data = await response.json();
//     return data
// }





async function getThriller(){
    const response = await fetch(`http://localhost:4000/moviedata/thriller`);
    const data = await response.json();
    return data

}





const thrillerBtn = document.getElementById("thriller");
thrillerBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
})

//displays 12 war movies
const warBtn = document.getElementById("war");
warBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const genre = this.getAttribute("id")
    const data = await getMovieApi(genre)
    displayMovieContainer(data);
    addMovieRoutes();
});


// **********************************************FETCH FUNCTIONS**********************************************

async function getMovieApi(genreName){
    const response = await fetch(`http://localhost:4000/moviedata/${genreName}`);
    const data = await response.json();
    return data
}


async function getKeywords(movie_id){
    const response = await fetch(`http://localhost:4000/get_keys/${movie_id}`);
    const data = await response.json();
    return data.keywords

}

async function getMovieList(movie_title){
    const response = await fetch(`http://localhost:4000/get_movies/${movie_title}`);
    const data = await response.json();
    return data
}

async function getMovie(movie_id){
    const response = await fetch(`http://localhost:4000/get_movie/${movie_id}`);
    const data = await response.json();
    return data
}

async function getProviders(movie_id){
    const response = await fetch(`http://localhost:4000/get_providers/${movie_id}`);
    const data = await response.json();
    return data
}

async function getMoviesByFilter(provider_list, country_code,page_num){
    // const providers = formatProviderParam(provider_list)
    const response = await fetch(`http://localhost:4000/get_movies_by_filter/${provider_list}/${country_code}/${page_num}`);
    const data = await response.json();
    return data

}

async function getSubscriptions(country_code){
    const response = await fetch(`http://localhost:4000/get_subscriptions/${country_code}`);
    const data = await response.json();
    return data
}

// async function getMoviesByFilter(providers, country_code,page_num){
//     const provider_list = formatProviderParam(providers)
//     // console.log(provider_list)
//     const response = await fetch(`http://localhost:4000/${providers}/${country_code}/${page_num}`);
//     const data = await response.json();
//     return data

// }

// *************************SUBSCRIPTION FILTER*************************


document.querySelector('#menu-title-subscription').addEventListener('click', async function(e){
    e.preventDefault();
    const subscriptionNav = document.querySelector('#filter');
    const currentState = window.getComputedStyle(subscriptionNav);
    if (currentState['display'] === 'none'){
        const userLocation = getLocation();
        const countryCode = userLocation.country_code;
        const data = await getSubscriptions(countryCode);
    
    
        const userLogo = await getSubscriptionLogo(data);
        displaySubscription(userLogo);
        let subscriptionList = retrieveSubscriptionsStorage();
        
        // consider if user does not choose a filter
        if (subscriptionList[0] == ''){
            subscriptionList = [];
        }
        else{
            showSelectedSubscriptions(subscriptionList);
        }
        addLogoRoutes(subscriptionList)
    }
    else{
        document.querySelector('#filter').style.display = "none";
    }



})


function getSubscriptionLogo(data){
    let dataDisplay = data.results.slice(0,20).map((object, index) => {
        const formatId = 'logo' + object.provider_id;
        return `<div class="subscription-logo" id=${formatId}><img src="https://image.tmdb.org/t/p/w45/${object.logo_path}" alt=""> </div>`
    }).join("");
    return dataDisplay
}

function showSelectedSubscriptions(userSubscriptionsArr){
    for (let i=0; i<userSubscriptionsArr.length; i++){
        //consider provider unavailable when country changes
        if (document.querySelector(`#logo${userSubscriptionsArr[i]}`)){
            document.querySelector(`#logo${userSubscriptionsArr[i]}`).style.opacity = 1;
        }
        
    }
    return userSubscriptionsArr
}


function retrieveSubscriptionsStorage(){
    let userSubscriptions = localStorage.getItem('subscription');
    if (userSubscriptions == null){
       return []
    }
    let userSubscriptionsArr = userSubscriptions.split(',');
    return userSubscriptionsArr
}


function displaySubscription(data){
    // document.querySelector('#main').style.display = 'none';
    // document.querySelector('#sub1').style.display = 'none';
    document.querySelector('#sub2').innerHTML = data;
    document.querySelector('#filter').style.display = 'block';
}


function addLogoRoutes(userSubscriptionsArr){
    let selectedLogo = document.querySelectorAll(".subscription-logo");
    let subscriptionList = userSubscriptionsArr;
    for (let i=0; i<selectedLogo.length; i++){


        const logoBtn = document.querySelector(`#${selectedLogo[i].id}`);
        logoBtn.addEventListener("click", function(e){
            e.preventDefault();
            let logoId = selectedLogo[i].id;
            console.log(logoId);
            const stripId = logoId.slice(4);

            //logo already selected
            if (subscriptionList.includes(stripId )){
                const index = subscriptionList.indexOf(stripId );
                subscriptionList.splice(index, 1);
                // selectedLogo[i].style.border = "none";
                selectedLogo[i].style.opacity= 0.3;
            }
            else{
                subscriptionList.push(stripId );
                // selectedLogo[i].style.border = "2px yellow solid";
                selectedLogo[i].style.opacity= 1;
                
            }
            

        })
    }

    document.querySelector('#subscription-submit').addEventListener('click', function(e){
        document.querySelector('#main').style.display = 'block';
        document.querySelector('#sub1').style.display = 'block';

        document.querySelector('#filter').style.display = 'none';
        localStorage.setItem('subscription', subscriptionList.toString())
    })
}

// function createSubscriptionDropdown(data){
//     const dropdownContainer = document.querySelector('#menu-title-subscription');
//     // dropdownContainer.multiple = true;
//     let dataDisplay = data.results.slice(0,20).map((object, index) => {
//         const newOption = document.createElement('option');
//         newOption.innerHTML = `${object.provider_id}`
//         newOption.value = "yay"
//         dropdownContainer.appendChild(newOption)

//         return 
//     });
    
// }






// function addLogoRoutes(){
//     // let selectedLogo = document.querySelectorAll(".subscription-logo");
//     let subscriptionList = []
//     for (let i=0; i<$j('.subscription-logo').length; i++){
//         // const logoBtn = document.querySelector(`#${selectedLogo[i].id}`);
//         let logoId= $j('.subscription-logo').attr('id');
//         let logoBtn = '#' + logoId;
//         (logoBtn).on("click", function(e){
//             e.preventDefault();
//             if (subscriptionList.includes(selectedLogo[i])){
//                 //already clicked

//                 //get index
//                 const index = subscriptionList.indexOf(selectedLogo[i]);
//                 subscriptionList.splice(index, 1);
//                 selectedLogo[i].style.border = "none";
//             }
//             else{
//                 subscriptionList.push(selectedLogo[i]);
//                 selectedLogo[i].style.border = "2px yellow solid";
//             }

//         })
//     }
// }


function formatProviderParam(arr){
    let query = '';
    for (let i=0; i<arr.length; i++){
        if(i == arr.length -1){
            query = query + arr[i]
            return query
        }
        query = query + arr[i] + "-";
    }
}

function formatProviderParam2(param){
    const reformatted = param.replace('-', '|');
    return reformatted
}



function getLocation(){
    const userInfo = localStorage.getItem("user");

    if (userInfo !== null){
        const userObject = JSON.parse(userInfo);
        const userLocation = userObject.location;
        return userLocation
    }
    //new user
    else{
        const userLocationData = localStorage.getItem("geoLocation");
        const userLocation = JSON.parse(userLocationData);
        // const countryCode = userLocation.country_code;
        // const countryName = userLocation.country;
        // return [countryCode, countryName]
        // return countryName
        return userLocation
    }

}    

// *************************COME BACKKKKKKK DON'T LEAVEEEEE*************************





// async function getVideo(movie_id){
//     const response = await fetch(`http://localhost:4000/get_video/${movie_id}`);
//     const data = await response.json();
//     return data
// }








// **********************************************CAROUSEL**********************************************
async function mainCarousel(genre,positionId){
    const data = await getMovieApi(genre);
    let dataDisplay = data.results.slice(0,12).map((object, index) => {

        const newItem = createCarouselImg(object,index);

        $j(function(){
            $j(positionId).owlCarousel('add', newItem);
            $j(positionId).owlCarousel('update')
        })


        return 
    });
}


function createCarouselImg(data, index){
    const {id,title, poster_path, backdrop_path} = data;
    const imageWidth = 300;

    let imgSrc = `https://image.tmdb.org/t/p/w${imageWidth}/${poster_path}` 

    if((poster_path == null)){
        imgSrc=`images/movieSlate.jpg" style = "width: ${imageWidth}px; height: 432px`
    }

    newOwlItem = `    <div class="item" id="item${index}">
    <img class="owlImg" id='${data.id}'src="${imgSrc}">
</div>`
    // const newItem = document.createElement('img');
    // newItem.src = imgSrc
    // console.log(newItem)


    return newOwlItem
}


// **********************************************SEARCH DISPLAY**********************************************


function displayMovieContainer(data, numOfMovies, count){
    let dataDisplay = data.slice(0,numOfMovies).map((object, index) => {
        return createMovieContainer(object,index,count)
    }).join("");

    
    document.querySelector("#main").style.display = "none";
    document.querySelector("#sub1").style.display = "none";

    const newContainer = document.createElement('div');
    newContainer.setAttribute('class', 'displayList');
    newContainer.setAttribute('id', `display${count}`);
    newContainer.innerHTML += dataDisplay;

    if (count !== 1){
        newContainer.style.display = 'none';
    }

    document.querySelector("#displayMovies").appendChild(newContainer);

    // display next button when page is ready
    isPageReady(10);


}


function displaySearchMovieContainer(data, numOfMovies){
    let dataDisplay = data.slice(0,numOfMovies).map((object, index) => {
        return createMovieContainer(object,index,1)
    }).join("");

    
    document.querySelector("#main").style.display = "none";
    document.querySelector("#sub1").style.display = "none";

    const newContainer = document.createElement('div');
    newContainer.setAttribute('class', 'displayList');
    // newContainer.setAttribute('id', `search${count}`);
    newContainer.innerHTML += dataDisplay;

    // if (count !== 1){
    //     newContainer.style.display = 'none';
    // }

    document.querySelector("#displayMovies").appendChild(newContainer);

    // display next button when page is ready
    // isPageReady(10);


}



function createNextBtn(count){
    const createButtonContainer = document.createElement('div');
    createButtonContainer.setAttribute('id', `btnContainer${count}`);
    createButtonContainer.setAttribute('class', 'btnContainer');

    const createButton = document.createElement('button');
    createButton.setAttribute('id', `nextBtn${count}`);
    createButton.setAttribute('class', 'nextBtn' )
    createButton.innerHTML = 'NEXT';

    //make it invisible until page~ is ready
    createButton.style.display = "none";
    
    document.querySelector(`#display${count}`).appendChild(createButtonContainer);
    document.querySelector(`#btnContainer${count}`).appendChild(createButton);

    createButton.addEventListener('click', function(e){
        e.preventDefault();
        const nextDisplay = document.querySelector(`#display${count + 1}`);
        if (nextDisplay){
            const currentDisplay = document.querySelector(`#display${count}`);
            currentDisplay.style.display = "none";
            nextDisplay.style.display = "inline-block";
            addGenreMovieRoutes(count+1);
        }
    })
}


function createPrevBtn(count){
    if (count == 1){
        return
    }
    const createButton = document.createElement('button');
    createButton.setAttribute('id', `prevBtn${count}`);
    createButton.setAttribute('class', 'prevBtn' )
    createButton.innerHTML = 'PREV';

    //make it invisible until page~ is ready
    // createButton.style.display = "none";
    
    document.querySelector(`#btnContainer${count}`).appendChild(createButton);

    createButton.addEventListener('click', function(e){
        e.preventDefault();
        const prevDisplay = document.querySelector(`#display${count - 1}`);
        if (prevDisplay){
            const currentDisplay = document.querySelector(`#display${count}`);
            currentDisplay.style.display = "none";
            prevDisplay.style.display = "inline-block";
        }

    })
}



function notReadyBtn(count){
    const createNotReady = document.createElement('button');
    createNotReady.setAttribute('id', `notReady${count}`);
    createNotReady.setAttribute('class', `notReady`);
    createNotReady.innerHTML = 'loading..';
    // document.querySelector(`#display${count}`).appendChild(createNotReady);
    document.querySelector(`#btnContainer${count}`).appendChild(createNotReady);

}

function isPageReady(searchLimit){
    console.log("checking if ready")
    for (let i=2; i<=searchLimit; i++){
        let nextPageReady = document.querySelector(`#display${i}`);
        if (nextPageReady){
            console.log(`page ${i} is readyyy`)
            const controlBtns = document.querySelector(`#notReady${i-1}`);
            if (controlBtns){
                document.querySelector(`#notReady${i-1}`).style.display = "none";
                document.querySelector(`#nextBtn${i-1}`).style.display = "inline-block";

            }
        }


    }

}
// const nextBtnArr = document.querySelectorAll('.nextBtn');
// console.log(nextBtnArr)
// for(let i=0; i<nextBtnArr.length; i++){
//     const nextBtn = nextBtnArr[i];
//     nextBtn.addEventListener('click', function(e){
//         e.preventDefault();
//         console.log(nextBtn.id.slice(5));
//     })
// }



// **********************************************MOVIE POSTER DISPLAY**********************************************
function createMovieContainer(data,index,listNum){
    const {id,title, poster_path, backdrop_path, overview, release_date, vote_average} = data;
    const imageWidth = 300;
    const idName = "movie_btn_" + listNum +'_' +index;
    let imgSrc = `"https://image.tmdb.org/t/p/w${imageWidth}/${poster_path}"` 

    if((poster_path == null)){
        imgSrc=`"images/movieSlate.jpg" style = "width: ${imageWidth}px; height: 432px"`
    }


    return `    <div class="movie${listNum}" id=${idName}>    <div class="poster">
             <img src=${imgSrc} alt="movie poster"/> 
        </div>


        <div id="${id}" class="title" style="width: ${imageWidth}px ">
            ${title}
        </div>

        <div class="descr">
            <div class="date">${release_date}</div>
            <div class="vote"><i class="fa-solid fa-star" style="color:orange">&nbsp;</i>${vote_average}</div>
        </div>
        </div>
        `
    
}



// function createMovieContainer(data,index){
//     const {id,title, poster_path, backdrop_path, overview, release_date, vote_average} = data;
//     const imageWidth = 780;
//     const className = "movie_btn_" + index;
//     let imgSrc = `"https://image.tmdb.org/t/p/w${imageWidth}/${backdrop_path}"` 

//     if((backdrop_path == null)){
//         imgSrc=`"ammonia_icon.png" style = "width: 300px"`
//     }


//     return `    <div class="movie" id=${className}>    <div class="poster">
//             <div> <img src=${imgSrc} alt="movie poster"/> </div>
//         </div>


//         <div id="${id}" class="title" style="width: ${imageWidth}px ">
//             ${title}
//         </div>

//         <div class="descr">
//             <div class="date">${release_date}</div>
//             <div class="vote"><i class="fa-solid fa-star" style="color:orange">&nbsp;</i>${vote_average}</div>
//         </div>
//         </div>
//         `
    
// }






// given movie's keywords, find any keywords relating to books or novels
function adaptedFromBook(keywordArr){
    for(let i in keywordArr){
        if(keywordArr[i].id == 818){
            return true
        }
    }
}


// ********consider if poster not available*********
// async function displaySimiliarMovies(data){

//     let dataDisplay = data.results.slice(0,20).map((object,index) => {
//         const {title,id, poster_path, backdrop_path, overview, release_date, vote_average} = object;
//         let imgSrc = `"https://image.tmdb.org/t/p/w300/${poster_path}"`;

//         let className = "movie_btn_" + index;
//         if((poster_path == null) && (backdrop_path== null)){
//             imgSrc="ammonia_icon.png"
//         }
//         else if (poster_path == null){
//             imgSrc = `"https://image.tmdb.org/t/p/w300/${backdrop_path}"`
//         }
//         else{
//             imgSrc = `"https://image.tmdb.org/t/p/w300/${poster_path}"`
//         }

//         return `
//         <div class="movie"> 
//         <div id="${id}" class=${className}> <img src=${imgSrc} alt="movie poster" /> </div>
//         </div>
//         `
//     }).join("");

//     document.querySelector(".displayList").innerHTML = dataDisplay;

// }


// function createMovieBtns(){
    //     //consider the number of outcomes
    //     for (let i=0; i<10; i++){
    //         let className = "#movie_btn_" + i;
    //         console.log(className)
    
    //         const movieBtn = document.querySelector(className)
    //         console.log(movieBtn)
    //         movieBtn.addEventListener("click", async function(e){
    //             e.preventDefault();
    //             const chosenMovie = document.querySelector(className);
    //             console.log(chosenMovie)
    //             document.querySelector(".displayList").innerHTML="";
    //             // document.querySelector(".displayList").appendChild(chosenMovie);
    //             const id = chosenMovie.id;
    //             const data = await getMovie(id);
    //             displayMovie(data);
    //             const keywordsData = await getKeywords(id);
    //             if (adaptedFromBook(keywordsData)){
    //                 alert("we have a book!")
    //             }
    //             else{
    //                 alert("noiirrr book")
    //             }
    //             displayVideo(id)
    //         })
    
    //     }
        
    // }
    
    // async function displayVideo(id){
    //     const video = await getVideo(id);
    //     const videoList = video.results;
    //     const wordList = ["Official", "official", "Trailer", "trailer"]
    //     // let potentialTrailerList = [];
    //     for(let video in videoList){
    //         let current_vid = videoList[video]
    //         if((current_vid.type == "Trailer")&&(current_vid.official == true)){
    //             let video_key = current_vid.key;
    //             console.log(current_vid);
    //             console.log(document.querySelector("#modalthere"));
    //             document.querySelector("#modalthere").innerHTML = `
    //             <iframe height="360" width="640"  
    //             src="https://www.youtube.com/embed/${video_key}">
    //             </iframe>`
    
    //             return
                
    //         }
    //     }
    // }

    // async function findMovie(movieTitle){
        //     const response = await fetch(`http://localhost:4000/moviedata/trendweek`);
        //     const data = await response.json();
        
        //     for(let page in data){
        //         for(let j=0; j<20; j++){
        //             if (data[page].results[j].title == movieTitle){
        //                 const foundMovie = data[page].results[j];
        //                 const movieId = foundMovie.id;
        //                 console.log(movieId);
        
        //                 return foundMovie;
        //             }
        //         } 
        //     }
        //     alert("NANI what movie?!?")
        //     return false;
        // }
        
// **********************************************MAKE BUTTONS FOR POSTERS**********************************************


function addSearchMovieRoutes(){
    let selectedMovie = document.querySelectorAll(".movie1");
    for (let i=0; i<selectedMovie.length; i++){
        if (selectedMovie[i].id){
            const movieBtn = document.querySelector(`#${selectedMovie[i].id}`);
            movieBtn.addEventListener("click", async function(e){
                e.preventDefault();
                const movieClass = this.querySelector(".title");
                const movieId = movieClass.id;
                // const provider = await getProviders(movieId);
                // console.log(provider);
                const data = await getMovie(movieId);
                // const providers = await getUserProviders(movieId, "KR")
                displayMoviePreview(data);
    
            })
        }

    }
}


function addGenreMovieRoutes(newCount){
    const parentEl = document.querySelector(`#display${newCount}`);
    const childElArr = parentEl.querySelectorAll(`.movie${newCount}`);

    for (let i=0; i<childElArr.length; i++){

        const movieBtn = document.querySelector(`#${childElArr[i].id}`);

        movieBtn.addEventListener("click", async function(e){
            e.preventDefault();
            const movieClass = this.querySelector(".title");
            const movieId = movieClass.id;
            const data = await getMovie(movieId);
            displayMoviePreview(data);

        })
        

    }
}
// ********************************************** FORMAT MODAL DISPLAY**********************************************


async function displayMovie(foundMovie){
    const {id,title, poster_path, runtime, genres, production_companies, overview, release_date, vote_average, videos, "watch/providers":providers} = foundMovie;
    const videoWidth = 740;
    const videoHeight = videoWidth / (16/9);

    const videoSrc = displayPreviewTrailer(videos.results);

    // const logoArray = displayPreviewLogo(production_companies);

    const genreArray = displayPreviewGenre(genres);

    const providersData = getPreviewProviders(providers);

    // // let providersInfo = '';
    // // providersInfo = displayPreviewExtraProviders(providersData);


    const providersArray = displayPreviewProviders(providersData);
    const buyArray = displayPreviewBuy(providersData);
    //"#modalhere" TESTA
    document.querySelector("#dialog-message").innerHTML = `
    <div class="videoDisplay">
    <iframe id="movieTrailer"height="${videoHeight}" width="${videoWidth}" allow="autoplay" 
    src=${videoSrc} frameborder="0" allowfullscreen> 
    </iframe></div>
    <h3 class="previewTitle">${title}</h3>
    ${genreArray} 
    <p class="previewTime">${runtime} min</p>
    
    <p class="previewDescr" id= "overview">${overview}</p>
    <div class="streamDisplay"><p class='providerLabel'>Stream</p><p class="previewStream" id= "previewStream">${providersArray}</p></div>
    <div class="buyDisplay"><p class='providerLabel'>Buy</p><p class="previewBuy" id= "previewBuy">${buyArray}</p></div>

    
    `
}

{/* <div class="logoDisplay"><p class="previewLogo" id= "previewLogo">${logoArray}</p> </div> */}

function displayPreviewTrailer(videoList){
    let videoSrc = '""';
    if (videoList.length > 0){
        for(let i=videoList.length-1; i>=0; i--){
            let currentVid = videoList[i];
            if((currentVid.name.search("trailer") >= 0)||(currentVid.name.search("Trailer") >= 0)){
                let videoKey = currentVid.key;
                return videoSrc = `"https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&rel=0"`
            }
        }
    }
    return videoSrc


}

function displayPreviewLogo(logoList){
    let dataDisplay = logoList.slice(0,logoList.length).map((object, index) => {
        if (object.logo_path !== null){
            return `<p class="previewLogoIcon" id="logo_${index}"><img src="https://image.tmdb.org/t/p/w92/${object.logo_path}" alt=""></p>`
        }
        return
    }).join("");
    return dataDisplay
}


function displayPreviewGenre(genreList){

    let dataDisplay = genreList.slice(0,genreList.length).map((object, index) => {
        return `<p class="previewGenreIcon" id="genre_${index}">${object.name}</p>`
    }).join("");
    return dataDisplay
}

// function getPreviewProviders(data){
//     // get user location
//     const userInfo = localStorage.getItem("user");
//     //returning user
//     if (userInfo !== null){
//         const userObject = JSON.parse(userInfo);
//         const userLocation = userObject.location; 

//         if (`${userLocation}` in data.results){
//             const providerArray = data.results[`${userLocation}`]
//             console.log(`finding list for ${userLocation}`)
//             console.log(providerArray)
//             return providerArray
//         }
//     }
//     //new user
//     else{
//         const userLocationData = localStorage.getItem("selectedLocation");
//         const userLocation = JSON.parse(userLocationData);
//         const countryCode = userLocation.country_code;
//         if (countryCode in data.results){
//             const providerArray = data.results[countryCode]
//             console.log(providerArray)
//             return providerArray
//         }
//     }
// }


function getPreviewProviders(data){
    // get user location
    const userLocationData= getLocation();
    const name = userLocationData.country;
    const code = userLocationData.country_code;

    // console.log(name);
    // console.log(code)
    if (code in data.results){
        const providerArray = data.results[code];
        // console.log(`finding list for ${name}`)
        // console.log(providerArray)
        return providerArray
    }
    console.log("didn't work")

}

function displayPreviewProviders(providersList){
    if ((providersList)&&("flatrate" in providersList)){
        let dataDisplay = providersList.flatrate.slice(0,providersList.length).map((object, index) => {
            if (object.logo_path !== null){
                return `<p class="previewProviderIcon" id="provider_${index}"><img src="https://image.tmdb.org/t/p/w92/${object.logo_path}" alt=""></p>`
            }
        }).join("");

        return dataDisplay
    }
    return  `<p id="previewProviderMessage" class="error_msg">Not available in your current location</p>`

}

function displayPreviewBuy(providersList){
    if ((providersList)&&("buy" in providersList)){
        let dataDisplay = providersList.buy.slice(0,providersList.length).map((object, index) => {
            if (object.logo_path !== null){
                return `<p class="previewBuyIcon" id="buy_${index}"><img src="https://image.tmdb.org/t/p/w92/${object.logo_path}" alt=""></p>`
            }
        }).join("");

        return dataDisplay
    }
    return  `<p id="previewBuyMessage" class="error_msg">Not available in your current location</p>`

}

function displayPreviewExtraProviders(providersList){
    if ("link" in providersList){
        const infoLink = providersList.link;
        return `<a href='${infoLink}'>More Info</a>`
}
}
// ********************************************** MODAL EXECUTE**********************************************

function displayMoviePreview(data ){
    displayMovie(data);

    $j(function(){
        // $j("#dialog-message" ).dialog("moveToTop");
        $j('#dialog-message').dialog( "open" );
        return
    })
    
}

// function displaySubscription(formattedLogos){
//     document.querySelector('#dialog-subscription').innerHTML=`${formattedLogos}`

//     $j(function(){
//         // $j("#dialog-message" ).dialog("moveToTop");
//         $j('#dialog-subscription').dialog( "open" );
//         return
//     })
//     addLogoRoutes();
// }

$j(function(){
    $j('.buttons').click(function(){
        $j(modal).dialog( "close" );
    })
})


// ********************************************** JAVASCRIPT EXECUTE**********************************************

window.addEventListener('load', async function(){
    mainCarousel("trendday","#trendTodayOwl");
    // addOwlRoutes()
    mainCarousel("trendweek","#trendWeekOwl");


    
})




const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", async function(e){
    e.preventDefault();
    const searchMovie = document.querySelector("#search_input").value;
    const movieList = await getMovieList(searchMovie);

    //validate if movie title exists
    if (movieList.results.length > 0){
        console.log(movieList.results.length)
        // displaySimiliarMovies(movieList);
        displaySearchMovieContainer(movieList.results,20);
        addSearchMovieRoutes()

    }
    else{
        alert("doesn't exist")
        $("<div>Test message</div>").dialog();
    }
    document.querySelector("#search_input").value = '';
    return
})


// ********************************************** GEOLOCATION EXECUTE**********************************************

// // get geolocation of user
// const data = null;

// const xhr = new XMLHttpRequest();
// //set to false because CORS blocks off all cookies
// xhr.withCredentials = false;

// xhr.addEventListener("readystatechange", async function () {
//   if (this.readyState === this.DONE) {
//     const response = this.response;
//     const myData = await JSON.parse(response);
//     let geolocation = {};
//     geolocation["location"] = myData;
//     localStorage.setItem('geoLocation', JSON.stringify(myData));


//     const data = localStorage.getItem('user')
//     //first time user
//     if (data == null){
//         // const userLocation = JSON.parse(localStorage.getItem('geoLocation'));
//         // console.log(userLocation);
//         // let user ={};
//         // user["location"] = userLocation;
//         // console.log(user)
//         localStorage.setItem('selectedLocation',JSON.stringify(myData));
//         displayFlag(myData.country_code)

//     }
//     else{
//         displayFlag(getLocation().country_code)
//     }
    
//   }
// });

// const MY_API_KEY = '417bf8a674b64865a20346832a91e6bd'
// xhr.open("GET", `https://ipgeolocation.abstractapi.com/v1?api_key=${MY_API_KEY}&fields=country_code,country,flag`);
// xhr.send(data);



// // get geolocation of user
// const data = null;

// const xhr = new XMLHttpRequest();
// //set to false because CORS blocks off all cookies
// xhr.withCredentials = false;

// xhr.addEventListener("readystatechange", async function () {
//   if (this.readyState === this.DONE) {
//     const response = this.response;
//     const myData = await JSON.parse(response);

//     const newUser = localStorage.getItem('geoLocation');
//     if (newUser == null){
//         displayFlag(myData.country_code)
//         let geolocation = {};
//         geolocation["location"] = myData;
//         localStorage.setItem('geoLocation', JSON.stringify(myData));
//     }
//     else{
//         updateFlagDisplay();
//     }

//   }
// });

// const MY_API_KEY = '417bf8a674b64865a20346832a91e6bd'
// xhr.open("GET", `https://ipgeolocation.abstractapi.com/v1?api_key=${MY_API_KEY}&fields=country_code,country,flag`);
// xhr.send(data);
     












function displayFlag(countryCode){
    document.querySelector('#menu-title-region').innerHTML= `<img src="https://flagsapi.com/${countryCode}/flat/24.png">`
    return 
}



document.querySelector('#menu-title-genre').addEventListener('click', function(e){
    e.preventDefault();
    const genreNav = document.querySelector('#sub-menu-genre');
    const currentState = window.getComputedStyle(genreNav);
    if (currentState['display'] === 'none'){
        document.querySelector('#sub-menu-genre').style.display = "block";
    }
    else{
        document.querySelector('#sub-menu-genre').style.display = "none";
    }
    
})

async function getRegions(){
    const response = await fetch(`http://localhost:4000/get_regions`);
    const data = await response.json();
    return data
}



async function getRegionNames(){
    const regionData = await getRegions();
    const regionDataArr = regionData.results;
    let regionNames = []
    for (let i=0; i<regionDataArr.length; i++){
        regionNames.push([regionDataArr[i].native_name, regionDataArr[i].iso_3166_1])
    }
    // console.log(regionNames)
    return regionNames
}


async function createRegionDropdown(){
    const countryNameList = await getRegionNames();

    const dropdownContainer = document.querySelector('#region');
    for (let i=0; i<countryNameList.length; i++){
        const name = countryNameList[i][0];
        const code = countryNameList[i][1];
        const newOption = document.createElement('option');
        newOption.textContent = name;
        newOption.value = name;
        newOption.id = code;
        dropdownContainer.appendChild(newOption);
    }

    const data = getLocation();
    const location = document.querySelector(`#${data.country_code}`)
    location.setAttribute("selected", 'selected');
}



document.querySelector('#menu-title-region').addEventListener('click', function(e){
    e.preventDefault();
    const regionNav = document.querySelector('#display-region');
    const currentState = window.getComputedStyle(regionNav);
    if (currentState['display'] === 'none'){
        createRegionDropdown()
        document.querySelector('#display-region').style.display="block";
    }
    else{
        document.querySelector('#display-region').style.display = 'none';
    }


})


document.querySelector("#regionBtn").addEventListener("click", function(e){
    e.preventDefault();
    const location =  document.querySelector('#region');
    const locationName = document.querySelector('#region').value;
    const locationCode = location.options[location.selectedIndex].id

    let locationObject = {};
    locationObject['country'] = locationName;
    locationObject['country_code'] = locationCode;

    let user = {};
    user["location"] = locationObject;
    // displayFlag(locationCode);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.removeItem("subscription");
    document.querySelector('#display-region').style.display = 'none';
    updateFlagDisplay();
    //display flag

})


function updateFlagDisplay(){
    const data = localStorage.getItem('user');
    //first time user
    if (data == null){
        const userLocation = JSON.parse(localStorage.getItem('geoLocation'));
        displayFlag(userLocation.country_code);
        return
    }
    const userSelectedLocation = JSON.parse(data);
    displayFlag(userSelectedLocation.location.country_code);
}
// function addOwlRoutes(){

//     const owlContainer = $j('.owl-stage').find('.owl-item')
//     console.log(owlContainer)
//     for (let i=0; i<24; i++){
//         // const owlItemArr = owlContainer.querySelectorAll('.owl-item');

//         for (owl in owlContainer){
//             const imgContainer = $j(owl).find('item');
//             console.log(imgContainer)
            
//             const imgContainerId = imgContainer.id;

//             const movieBtn = document.querySelector(`#${imgContainerId}`);
//             movieBtn.addEventListener("click", async function(e){
//                 alert("hey")
//                 const movieClass = this.querySelector(".owlImg");
//                 const movieId = movieClass.id;
//                 console.log(movieId);
//                 data = await getMovie(movieId);
//                 displayMoviePreview(data);})
           
//         }
        
//     }
// }



// function addOwlRoutes(){
//     let selectedMovie = document.querySelectorAll(".item");
//     for (let i=0; i<selectedMovie.length; i++){
//         if (selectedMovie[i].id){
//             const movieBtn = document.querySelector(`#${selectedMovie[i].id}`);
//             movieBtn.addEventListener("click", async function(e){
//                 e.preventDefault();
//                 const movieClass = this.querySelector(".owlImg");
//                 const movieId = movieClass.id;
//                 console.log(movieId);
//                 data = await getMovie(movieId);
//                 displayMoviePreview(data);
    
//             })
//         }

//     }
// }


// $j(function(){
//     $j('#item2').click(function(){
//         const imgTag = $j(this).find('img');
//         const movieId = $j(imgTag).attr('id');
//         owlPreview(movieId);
//     })
// })

// $j( "#item2" ).trigger( "click" );

// async function owlPreview(movieId){
//     data = await getMovie(movieId);
//     displayMoviePreview(data);
// }













//turns off youtube when modal closed

// jQuery(document).ready(function($) {
//     let url = $("#movieTrailer").attr('src');
//     $('#myModal').on('hide.bs.modal', function() {
//         $("#movieTrailer").attr('src', '');
//     });
//     $('#myModal').on('show.bs.modal', function() {
//         $("#movieTrailer").attr('src', url);
//     });
// });

// $('.dropdown-item').click(function(){
//     $('.dropdown-menu').css("display", "none")
// })



