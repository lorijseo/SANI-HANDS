
const emailBtn = document.getElementById("emailIcon");
console.log("weee");

// emailBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     console.log("wooo");
//     document.querySelector(".sendEmail").style.display="block";
// })


emailBtn.addEventListener("click", function(e){
    e.preventDefault();
    console.log("wooo");
    document.querySelector("#emailForm").style.display="block";
})

const emailSendBtn = document.getElementById("sendEmailBtn");

// emailSendBtn.addEventListener("click", function(e){
//     e.preventDefault();
//     document.querySelector("#sender").value = "";
// })


//formspree clear submitted form
window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
  }