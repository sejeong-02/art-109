
document.querySelector("#image-0").addEventListener("click", function(){
    // document.querySelector("#image-1").style.display = "none";
    document.querySelector("#image-1").style.visibility = "visible";
    alert("fur babies!")
})

document.querySelector("#image-1").addEventListener("click", function(){
    document.querySelector("#image-2").style.visibility = "visible";
})

document.querySelector("#image-2").addEventListener("click", function(){
    document.querySelector("#image-3").style.visibility = "visible";
    alert("white kitty!")
})

document.querySelector("#image-3").addEventListener("click", function(){
    document.querySelector("#image-4").style.visibility = "visible";
    alert("gray kitty!")
})

document.querySelector("#image-4").addEventListener("click", function(){
    document.querySelector("#image-5").style.visibility = "visible";
})

document.querySelector("#image-5").addEventListener("click", function(){
    document.querySelector("#image-6").style.visibility = "visible";
})

document.querySelector("#image-6").addEventListener("click", function(){
    document.querySelector("#image-7").style.visibility = "visible";
})

// let divsNodes = document.querySelectorAll(".image-div hidden");
// let divs = Array.from(divsNodes);

// for (i = 0; i < divs.length; i++) {
//     let currentDiv = divs[i];
//     let nextDiv = divs[i+1];

//     currentDiv.addEventListener('click', () => {
//         nextDiv.style.display = "none";
//     });
// }