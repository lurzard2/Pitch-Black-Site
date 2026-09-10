import {_, Save, Load } from '../js/main.js';

const __ = Load(_.VisceralGrove);
function _Save() { Save(_.VisceralGrove, __); }
function log(msg) { console.log(msg); }

//NAVIGATION
const path = "https://lurvixen.com/visceralgrove";
export function SetChapter(dest = "", replace = false){
    const href = dest === "" ? path : path + "/" + dest;
    if (replace){
        // prevents backtracking
        window.location.replace(href);
        return
    }
    window.location.href = href;
}

//FLAG
export function Flag(name, value){
    __.Flags[name] = value
    _Save()
}
export function GetFlag(name, value){
    return __.Flags[name] === value;
}
export function HasFlagged(name){
    return GetFlag(name, true);
}




















class XYZ{
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// 16x16 source resolution for all assets
const TILE_SIZE = 16;
// 12x8 grid resolution
const CANVAS_SIZE = new XYZ(12, 8);

// TODO: Source res 16x16, Display res 32x32

class LevelContext{
    constructor(tilesContext){
        this.originCoord = new XYZ(0,0);
        this.tilesContext = tilesContext;
    }
}






const c = document.getElementById('visceralgrove');
const ctx = c.getContext('2d');
ctx.width = CANVAS_SIZE.x * TILE_SIZE;
ctx.height = CANVAS_SIZE.y * TILE_SIZE;