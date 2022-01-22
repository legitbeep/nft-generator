// import file system
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { layers, width, height } = require("./input/config.js");

const canvas = createCanvas(width,height);
const ctx = canvas.getContext("2d");

const fNames = ["Galctus", "Filthy", "Big", "Deep", "Yeet", "Yeeger", "Yoink","Sansa", "Arther", "Skye", "Fart", "Master","Crime Master", "Maze", "Goblin", "Shady", "Kanye", "The", "No", "Sky","Ultra", "Wierd", "Strong", "Weak", "Broad", "Heavy", ..."trashy tubular nasty jacked swol buff ferocious firey flamin agnostic anxious artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical".split(' ')];
const lNames = ["king", "chung", "bro", "bart", "eren", "yeeter","man", "woman", "luke", "walker", "frank", "gogo","slim", "pac", "south", "wolf", "bread", "flower","thing", "cap","legend", "fired", "alien", "jaadu", "gangsta", "jedi", "fox", "silver", "pasta", "chief", "barbarian", "myth", "furry", "barter", "agent", "theif", "potato"]; 

const takenNames =[""];
const generated = [];

const getEdition = () => {
    let totalCombinations = 1;
    for(let i = 1; i<layers.length; i++){
        totalCombinations *= layers[i].elements.length;
    }
    return totalCombinations ;
}

const editions = getEdition();

const saveLayer = (_canvas,_name) => {
    fs.writeFileSync(`./output/${_name}.png`,_canvas.toBuffer("image/png")); // path, buffer
}

const saveMeta = (name) => {
    const meta = {
        name,
        description: `A drawing of ${name}`,
        image: `${name}.png`,
        attributes: [
            { 
                rarity: 0.5
            }
        ]
    }
    fs.writeFileSync(`./output/${name}.json`, JSON.stringify(meta))
}

const drawLayer = async(_layer, _name, index) => {
    let element = _layer.elements[index];
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
        saveLayer(canvas,_name);
        saveMeta(_name);
    }
}

const getFirstCombination = () => {
    let _curCombination = "", _maxCom = [], _finalCom = "" ;
    layers.forEach((_layer) => {
        if (_layer.id !== 1) {
            _curCombination = _curCombination + "0" ;
            _maxCom.push(_layer.elements.length-1);
            _finalCom = _finalCom + (_layer.elements.length-1);
        }
    })
    return [_curCombination, _maxCom, _finalCom];
}

let [curCombination, maxCombination, finalCombination] = getFirstCombination();
console.log("Generating "+ editions + " combinations of input files...");
let indices = [];
for(let i = 0 ; i<curCombination.length; i++){
    indices.push(parseInt(curCombination[i]));
}
let curName = "";

while(generated.length < 10 && curCombination != finalCombination){
    while(generated.includes(curCombination) && curCombination != finalCombination){
        for(let i = indices.length-1; i>0; i--){
            indices[i]++;
            if( indices[i] > maxCombination[i] ){
                for(let j = i ; j<indices.length; j++){
                    indices[j] = 0;
                }
            } else {
                break;
            }
        }
        curCombination = "";
        indices.forEach(idx => curCombination += idx + "");
    }
    while(takenNames.includes(curName)){
        curName = fNames[Math.floor(Math.random()*fNames.length)] + " " + lNames[Math.floor(Math.random()*lNames.length)]
    }
    generated.push(curCombination);
    takenNames.push(curName);
    layers.forEach((lyr,idx) => {
        drawLayer(lyr, curName, lyr.id == 1 ? Math.floor(Math.random()*lyr.elements.length) : indices[idx-1])
    })
    console.log("added image",curName);
}
