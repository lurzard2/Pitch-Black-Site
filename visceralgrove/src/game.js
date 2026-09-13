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

export function IterateOnGrid(callback){
    for (let x = 0; x < GRID.x; x++){
        for (let y = 0; y < GRID.y; y++){
            callback(new XYZ(x, y));
        }
    }
}

// 12x8 (16x16) screen
export const SCREEN = GRID.Normalized;



export const canvas = document.body.appendChild(document.createElement('canvas'));
export const render2D = canvas.getContext('2d');
canvas.width = SCREEN.x;
canvas.height = SCREEN.y;



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
window.addEventListener('keydown', function(e) {
    controller[e.key] = true;
})
window.addEventListener('keyup', function(e) {
    controller[e.key] = false;
})



export const FileExt = {
    Image: 'image',
}
export function GetFileExt(type) {
    if (type === FileExt.Image) {
        return '.png'
    }
}

export class Asset {
    constructor(assetName = 'PH', ext = FileExt.Image) {
        this.assetName = assetName + GetFileExt(ext);
    }

    get Name(){
        return '/visceralgrove/assets' + this.assetName
    }
}



export class Thing {
    constructor(asset = new Asset(), pos = new XYZ()) {
        this.asset = asset;
        this.pos = pos;
    }

    Update(){ }
}



export let debug = true;
export let showDebugGrid = false;

if (debug) {
    IterateOnGrid((pos) => {
        render2D.strokeStyle = 'blue';
        render2D.strokeRect(Normalize(pos.x), Normalize(pos.y), TILE, TILE)
    })
}