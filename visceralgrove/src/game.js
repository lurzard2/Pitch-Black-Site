export const directory = '/visceralgrove/';
export let debug = true;



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
    for (let y = 0; y < GRID.y; y++) {
        for (let x = 0; x < GRID.x; x++) {
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

export function SlimeGridLoop(length, callback) {
    /*for (let i = 0; i < length; i++) {
        const x = i % GRID.x - 1;
        const y = Math.floor(i / GRID.x);
        console.debug(`Tile index ${i} is located at (${x}, ${y})`);
        callback(i, new XYZ(x, y));
    }*/

    let i = 0;
    for (let y = 0; y < GRID.y; y++) {
        for (let x = 0; x < GRID.x; x++) {
            //console.log(`Tile index ${i} is located at (${x}, ${y})`);
            i++;
            callback(i, new XYZ(x, y));
        }
    }
}

export function GetPlaceInGridLoop(index, rows, cols) {
    rows -= 1;

}



// 12x8 (16x16) screen
export const SCREEN = GRID.Normalized;



// START!
import {
    Application,
    Container,
    Ticker,
    Assets,
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

    Assets.init({
        loadOptions: {
            onProgress: (p) => {if (debug) { console.debug(`Loading Asset: ${Math.round(p * 100)}%`) }},
            onError: (err, asset) => console.error(`Error loading ${asset.src}: ${err.message}`)
        },
        basePath: ''
    })
})()



import { WorldLoader } from './worldLoader.js'
export const worldLoader = new WorldLoader('test');

async function Load(){
    await worldLoader.LoadWorld()
}
await Load();

if (debug) {
    console.debug('WORLD INIT!!!', worldLoader)
}



export const globalClock = new Ticker()
globalClock.minFPS = 60
globalClock.maxFPS = 60
globalClock.start()



import { SceneHandler } from './sceneHandler.js';
const sceneHandler = new SceneHandler();
await sceneHandler.LoadAllAssets();



console.info(
    'Clarification on WebGL warnings',
    '\n"WebGL context was lost" - ARBITRARY\n   It means it survived, WebGL context is fine.',
    '\n"Source map error: (...)" - ARBITRARY\n   Missing file used for debugging, which we don\'t need.'
)