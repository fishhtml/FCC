function sentDanmu (textSel, showSel, colorSel, fontSel, speedSel) {
    let danmuWall = document.querySelector(showSel);
    let value = document.querySelector(textSel).value;
    let color = document.querySelector(colorSel).value;
    let fontSize = document.querySelector(fontSel).value;
    let maxHeight = parseInt(window.getComputedStyle(danmuWall).height.replace(/[^0-9\.]+/g, ""));
    let maxWidth = parseInt(window.getComputedStyle(danmuWall).width.replace(/[^0-9\.]+/g, ""));
    let negativeWidth = parseInt(fontSize) * value.length;
    let speed = maxWidth / document.querySelector(speedSel).value;
    let newDanmu = document.createElement("div");
    newDanmu.innerText = value.toString();
    newDanmu.style.display = "inline-block";
    newDanmu.className = "danmu-text";
    newDanmu.style.top = maxHeight * Math.random() * 0.3 + "px";
    danmuWall.appendChild(newDanmu);
    newDanmu.style.left = maxWidth + "px";
    newDanmu.style.fontSize = fontSize + "px";
    newDanmu.style.transitionDuration = speed + "s";
    newDanmu.style.color = color;
    setTimeout(() => {
        newDanmu.style.left = "-" + negativeWidth + "px";
    }, 100);
}

document.querySelector("#danmu-send").onclick = function () {
    return sentDanmu("#danmu-content", "#danmu-screen", "#danmu-color", "#danmu-fontSize", "#danmu-speed");
};