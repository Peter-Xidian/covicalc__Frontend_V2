
/*==================== PER CONTINENT SLIDER ====================*/ 

// variables
let thumbnails = document.getElementsByClassName("thumbnail");
let slider = document.getElementById("slider");
let buttonRight = document.getElementById("slide-right");
let buttonLeft = document.getElementById("slide-left");

// scrolls thumbnail element to the left or right by 125px
buttonLeft.addEventListener("click", () => {
    slider.scrollLeft -= 125;
});

buttonRight.addEventListener("click", () => {
    slider.scrollLeft += 125;
});


//function calculates maximum width of the slider container
const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

//AutoPlay Slider
function autoPlay() {
    if (slider.scrollLeft > (maxScrollLeft - 1)) {
        slider.scrollLeft -= maxScrollLeft;
    } else {
        slider.scrollLeft += 1;
    }
}
let play = setInterval(autoPlay, 40);


//pauses slider when child element is hovered
for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("mouseover", () => {
        clearInterval(play);
    })

    thumbnails[i].addEventListener("mouseout", () => {
        return play = setInterval(autoPlay, 30);
    })
}
