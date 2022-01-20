// import file system
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const canvas = createCanvas(1000,1000);
const ctx = canvas.getContext("2d");

const saveLayer = (_canvas) => {
    fs.writeFile("./output/newImg.png",_canvas.toBuffer("image/png")); // path, buffer
}

const drawLayer = async() => {
    const image = loadImage("./input/img.png");
    ctx.drawImage(img,0,0,1000,1000); //(img,x,y,width,height);
    saveLayer(canvas);
}

drawLayer();