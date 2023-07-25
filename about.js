const emailBtn = document.getElementById("email");
console.log("weee");

emailBtn.addEventListener("click", function(e){
    e.preventDefault();
    console.log("wooo");
    document.querySelector(".sendEmail").style.display="block";
})


// emailBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     console.log("wooo");
//     document.querySelector("#emailForm").style.display="block";
// })