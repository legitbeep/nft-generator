// import file system
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { layers, width, height } = require("./input/config.js");
const editions = 1;

const canvas = createCanvas(1000,1000);
const ctx = canvas.getContext("2d");

const saveLayer = (_canvas) => {
    fs.writeFile("./output/newImg.png",_canvas.toBuffer("image/png")); // path, buffer
}

const drawLayer = async(_layer, _editio) => {
    let element = _layer[Math.floor(Math.random()+ _layer.elements.length)];
    console.log(element);
    // const img = loadImage("./input/img.png");
    // ctx.drawImage(img,0,0,1000,1000); //(img,x,y,width,height);
    // saveLayer(canvas);
}

for(let i=1; i<=editions; i++){
    layers.forEach((layer) => {
        drawLayer(layer,i);
    })
}