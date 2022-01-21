const fs = require("fs");

const width = 500;
const height = 500;
const dir = __dirname;
const rarity = [
    {key: "", val: "original"},
    {key: "_r", val: "rare"},
    {key: "_sr", val: "super rare"},
];

const clearName = (_str) => {
    let name = _str.slice(0,-4);
    rarity.forEach(r => {
        name = name.replace(r.key,"");
    });
    return name;
}

const addRarity = (_str) => {
    let itemRarity = "original";
    rarity.forEach(r => {
        if (_str.includes(r.key)) {
            itemRarity = r.val;
        }
    });
    return itemRarity;
}

const getElements = (path) => {
    return fs
        .readdirSync(path)
        .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
        .map((i,index) => {
            return {
                id: index+1,
                name: clearName(i),
                fileName: i,
                rarity: addRarity(i),
            };
        })
}

const layers = [{
    id: 1,
    name: "background",
    location : dir + "/background/",
    elements : getElements(`${dir}/background/`),     
    position : {x:0, y:0},
    size : { width, height },
},{
    id: 2,
    name: "face",
    location : dir + "/face/",   
    elements : getElements(`${dir}/face/`),     
    position : {x:0, y:0},
    size : { width, height },
},{
    id: 3,
    name: "hair",
    location : dir + "/hair/",  
    elements : getElements(`${dir}/hair/`),      
    position : {x:0, y:0},
    size : { width, height },
},{
    id: 4,
    name: "mouth",
    location : dir + "/mouth/",   
    elements : getElements(`${dir}/mouth/`),     
    position : {x:0, y:0},
    size : { width, height },
},{
    id: 5,
    name: "eyes",
    location : dir + "/eyes/",
    elements : getElements(`${dir}/eyes/`),        
    position : {x:0, y:0},
    size : { width, height },
},]

module.exports = { layers, width, height };