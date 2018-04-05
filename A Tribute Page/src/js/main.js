function setImage (imgSection, imgNum) {
    let img = document.querySelector(imgSection);
    let left = -1;
    setInterval(function () {
        img.style.left = left * 100 + "%";
        -left < imgNum - 1 ? left-- : left = 0;
    }, 3000);
}
document.onload = setImage(".slide-show-inner", 3);