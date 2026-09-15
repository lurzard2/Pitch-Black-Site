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

    FromString(str){
        const strings = str.split(',')
        return new XYZ(strings[0], strings[1], strings[2]);
    }

    get ToString() {
        return `${this.x},${this.y},${this.z}`
    }
}



// 16x16
// Globally consistent tile and asset size which must be maintained.
export const TILE = 16;
export function Normalize(val) { return val < 1 ? val : val * TILE }

// 12x8 tile grid
export const GRID = new XYZ(12, 8);

// 2d iteration on grid tiles
export function SearchGrid(callback) {
    for (let x = 0; x < GRID.x; x++) {
        for (let y = 0; y < GRID.y; y++) {
            callback(new XYZ(x, y));
        }
    }
}

// calculated left-down iteration on grid tiles, best for non-2d arrays
export function LoopThroughGrid(callback, pos = new XYZ(-1)) {
    const total = GRID.x * GRID.y
    for (let i = 0; i < total; i++) {
        pos.x += 1
        if (pos.x === GRID.x) {
            pos.x = 0
            pos.y += 1
        }
        callback(pos);
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

import { World } from './world.js'
export const world = new World('test');

async function Load(){
    await world.LoadWorld()
}
await Load();
//console.log('INIT!!!', world)

import { Camera } from './camera.js';
export const camera = new Camera();



export let debug = true;
export let showDebugGrid = false;

if (debug) {
    SearchGrid((pos) => {
        render2D.strokeStyle = 'blue';
        render2D.strokeRect(Normalize(pos.x), Normalize(pos.y), TILE, TILE)
    })
}