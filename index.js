// import file system
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { layers, width, height } = require("./input/config.js");
const editions = 1;

const canvas = createCanvas(1000,1000);
const ctx = canvas.getContext("2d");

const saveLayer = (_canvas,_edition) => {
    fs.writeFile(`./output/${_edition}.png`,_canvas.toBuffer("image/png")); // path, buffer
}

const drawLayer = async(_layer, _edition) => {
    let element = _layer[Math.floor(Math.random()+ _layer.elements.length)];
    if (element) {
        const img = await loadImage(`${_layer.location}${element.fileName}`);
        ctx.drawImage(
            img,
            _layer.position.x,
            _layer.position.y,
            _layer.size.width,
            _layer.size.height
        ); //(img,x,y,width,height);
        console.log(`Added ${_layer.name} and chose ${element.name}`);
        saveLayer(canvas,_edition);
    }
}

for(let i=1; i<=editions; i++){
    layers.forEach((layer) => {
        drawLayer(layer,i);
    })
}