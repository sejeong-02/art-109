
document.querySelector("#image-0").addEventListener("click", function(){
    // document.querySelector("#image-1").style.display = "none";
    document.querySelector("#image-1").style.visibility = "visible";
    alert("here's a pudding!")
})
document.querySelector("#image-1").addEventListener("click", function(){
    alert("what about vanilla icecream?")
})
document.querySelector("#image-3").addEventListener("click", function(){
    alert("cookies?")
})
document.querySelector("#image-4").addEventListener("click", function(){
    alert("blueberry pancakes?")
})
document.querySelector("#image-6").addEventListener("click", function(){
    alert("i personally love cheesecake!!")
})
document.querySelector("#image-7").addEventListener("click", function(){
    alert("you have to be careful eating tanghulu")
})
document.querySelector("#image-9").addEventListener("click", function(){
    alert("strawberry cake~")
})
document.querySelector("#image-11").addEventListener("click", function(){
    alert("marshmallow!!")
})
document.querySelector("#image-13").addEventListener("click", function(){
    alert("whipped cream and churro muffins")
})
document.querySelector("#image-15").addEventListener("click", function(){
    alert("cherry soda")
})
document.querySelector("#image-19").addEventListener("click", function(){
    alert("this one is blue soda!")
})
document.querySelector("#image-20").addEventListener("click", function(){
    alert("strawberry mochi yumm")
})
document.querySelector("#image-21").addEventListener("click", function(){
    alert("popsiclesss")
})
document.querySelector("#image-25").addEventListener("click", function(){
    alert("OREO")
})
document.querySelector("#image-26").addEventListener("click", function(){
    alert("kisses")
})
document.querySelector("#image-27").addEventListener("click", function(){
    alert("oreo frappuccino")
})
document.querySelector("#image-31").addEventListener("click", function(){
    alert("mint choco icecream")
})
document.querySelector("#image-32").addEventListener("click", function(){
    alert("so much icecream")
})
document.querySelector("#image-36").addEventListener("click", function(){
    alert("last one!!")
})

let divsNodes = document.querySelectorAll(".image-div.hidden");
let divs = Array.from(divsNodes);

for (i = 0; i < divs.length; i++) {
    let currentDiv = divs[i];
    let nextDiv = divs[i+1];

    currentDiv.addEventListener('click', () => {
        nextDiv.style.visibility = "visible";
    });
}

document.querySelector("#image-36").addEventListener("click", function(){
    alert("the end!")
})

document.addEventListener("DOMContentLoaded", () => {
    let images = document.querySelectorAll(".image-div.hidden");

images.forEach((img, index) => {
    // Random positioning inside viewport
    img.style.left = `${Math.random() * (window.innerWidth + 280)}px`;
    img.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
})

})