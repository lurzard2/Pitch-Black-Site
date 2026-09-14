// Positioning System
export class XYZ {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get Normalized() {
        return new XYZ(Normalize(this.x), Normalize(this.y))
    }
}



// 16x16
// Globally consistent tile and asset size which must be maintained.
export const TILE = 16;
export function Normalize(val) { return val < 1 ? val : val * TILE }

// 12x8 tile grid
export const GRID = new XYZ(12, 8);

export function IterateOnGrid(callback) {
    for (let x = 0; x < GRID.x; x++){
        for (let y = 0; y < GRID.y; y++){
            callback(new XYZ(x, y));
        }
    }
}

// 12x8 (16x16) screen
export const SCREEN = GRID.Normalized;



export const canvas = document.body.appendChild(document.createElement('canvas'));
canvas.width = SCREEN.x;
canvas.height = SCREEN.y;

export const render2D = canvas.getContext('2d');



export const processes = [];
export function PushUpdatableProcess(proc){
    processes.push(proc)
}
let evenUpdate = true;
function Update() {
    evenUpdate = !evenUpdate;

    processes.forEach(proc => {
        proc.Update(evenUpdate);
    })

    requestAnimationFrame(Update);
}
requestAnimationFrame(() => {
    Update();
});



export const directory = '/visceralgrove/';
export class Asset {
    constructor(assetName, ext) {
        this.assetName = assetName;
        this.ext = ext;
    }

    // prefix and/or suffix injection
    ExtName({pf = '', sf = ''}) {
        return directory+'assets/'+ pf+this.assetName+sf +'.'+this.ext;
    }

    get GetName() {
        return this.ExtName({});
    }
}

export class VGImage extends Asset {
    constructor(textureName = 'PH', ext = 'png') {
        super(textureName, ext);
    }

    #Load(img, x, y) {
        render2D.drawImage(img, x, y, TILE, TILE);
    }

    Render(pos) {
        const i = new Image();

        i.onload = () => {
            this.#Load(i, pos.x, pos.y);
        }

        i.onerror = (e) => {
            console.log(e, '\n'+i);
        }

        i.src = this.GetName
    }
}



export class Tile {
    constructor(asset = new VGImage(), pos = new XYZ()) {
        this.asset = asset;
        this.pos = pos;
    }

    Render() {
        this.asset.Render(this.pos.Normalized)
    }
}

import { Camera } from './camera.js';
export const camera = new Camera();

import { Level } from './level.js'
export const level = new Level(document.title);
// We need to WAIT. For level.lvl to be assigned. before we start grabbing it.
level.lvl = JSON.parse(await level.LoadLvl())
camera.LoadLvlScreen()
//console.log(level.lvl);



export let debug = true;
export let showDebugGrid = false;

if (debug) {
    IterateOnGrid((pos) => {
        render2D.strokeStyle = 'blue';
        render2D.strokeRect(Normalize(pos.x), Normalize(pos.y), TILE, TILE)
    })
}