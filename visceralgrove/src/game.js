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



// Player controller by listening to key presses
export const controller = {};
export function GetInput(key) {
    return controller[key];
}
window.addEventListener('keydown', function(e) {
    controller[e.key] = true;
})
window.addEventListener('keyup', function(e) {
    controller[e.key] = false;
})


export const assetsPath = '/visceralgrove/assets/';
export class Asset {
    constructor(assetName, ext) {
        this.assetName = assetName;
        this.ext = ext;
    }

    // prefix and/or suffix injection
    ExtName({pf = '', sf = ''}) {
        return assetsPath + pf + this.assetName + sf + '.' + this.ext;
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

    Push(pos) {
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
        this.asset.Push(this.pos.Normalized)
    }
}


export class Camera {
    constructor(targetPos) {
    }
}

export class Scene {
    constructor() {

    }
}



export let debug = false;
export let showDebugGrid = false;

if (debug) {
    IterateOnGrid((pos) => {
        render2D.strokeStyle = 'blue';
        render2D.strokeRect(Normalize(pos.x), Normalize(pos.y), TILE, TILE)
    })
}