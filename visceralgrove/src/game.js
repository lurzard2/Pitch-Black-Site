export const directory = '/visceralgrove/';



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

// calculated left-down iteration on grid tiles, best for forward iteration on a 1d array
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



// START!
import {
    Application,
    Container,
    Assets
} from '/js/pixi.mjs'

export const app = new Application();
export const container = new Container();

(async () => {
    await app.init({
        background: 'grey',
        width: SCREEN.x,
        height: SCREEN.y,
    })
    document.body.appendChild(app.canvas);
    app.stage.addChild(container);
})()



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



import { World } from './world.js'
export const world = new World('test');

async function Load(){
    await world.LoadWorld()
}
await Load();

export let debug = true;

if (debug) {
    console.debug('WORLD INIT!!!', world)
}



import { VGAssets } from './VGAssets.js'
export const vgassets = new VGAssets()



console.info(
    'Clarification on WebGL warnings',
    '\n"WebGL context was lost" - ARBITRARY\n   It means it survived, WebGL context is fine.',
    '\n"Source map error: (...)" - ARBITRARY\n   Missing file used for debugging, which we don\'t need.'
)