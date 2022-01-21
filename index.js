// import file system
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { layers, width, height } = require("./input/config.js");

const canvas = createCanvas(width,height);
const ctx = canvas.getContext("2d");

const getEdition = () => {
    let totalCombinations = 0;
    for(let i = 1; i<layers.length; i++){
        totalCombinations *= layers[i].elements.length;
    }
    return totalCombinations || 1;
}

// to store combinations generated
const generated = [];
const editions = getEdition();

const saveLayer = (_canvas,_edition) => {
    fs.writeFileSync(`./output/${_edition}.png`,_canvas.toBuffer("image/png")); // path, buffer
    console.log("added image"+_edition);
}

const drawLayer = async(_layer, _edition, index) => {
    let element ;
    //if ( _layer.id == 1 ){
        element = _layer.elements[Math.floor(Math.random()*_layer.elements.length)];
    // } else {
    //     element = _layer.elements[index];
    // }
    if (element && element.fileName) {
        const img = await loadImage(`${_layer.location}${element.fileName}`);
        ctx.drawImage(
            img,
            _layer.position.x,
            _layer.position.y,
            _layer.size.width,
            _layer.size.height
        ); //(img,x,y,width,height);
        //console.log(`Added ${_layer.name} and chose ${element.name}`);
        saveLayer(canvas,_edition);
    }
}

const findUniqueCombination = () => {
    let indices = [1,1,1,1];
    let curCombination = "1111";
    while(generated.includes(curCombination)){
        curCombination = "";
        indices = [...layers.map(_layer => (_layer.id !== 1 && Math.floor(Math.random()*_layer.elements.length)))];
        indices.forEach(idx => {
            curCombination += idx+"";
        })
    }
    generated.push(curCombination);
    return indices;
}

for(let i=1; i<=10; i++){
    let indices = findUniqueCombination();
    try {
        layers.forEach((layer,idx) => {
            drawLayer(layer,i,indices[idx]);
        })
    } catch(err) {
        console.log(err);
    }
}
