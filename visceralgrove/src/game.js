export const canvas = document.body.appendChild(document.createElement('canvas'));
export const render2D = canvas.getContext('2d');

// Coordinate system
export class XYZ {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Getting either a normalized single value or a normalized XY
    Normalize(val) { return XYZ.Normalize(val) }
    static Normalize(val) { return val < 1 ? val : val * XYZ.TILE }
    get Normalized(){
        return new XYZ(this.Normalize(this.x), this.Normalize(this.y))
    }

    // 16x16
    // Globally consistent tile and asset size which must be maintained.
    static TILE = 16;
    //12x8 tile grid
    static GRID = new XYZ(12, 8);
    //12x8 (16x16) screen
    static SCREEN = this.GRID.Normalized;
}

// Global process
class VisceralGrove {
    constructor() {
        canvas.width = XYZ.SCREEN.x;
        canvas.height = XYZ.SCREEN.y;
    }

    IterateOnGrid(callback){
        for (let x = 0; x < XYZ.GRID.x; x++){
            for (let y = 0; y < XYZ.GRID.y; y++){
                callback(new XYZ(x, y));
            }
        }

    }
}


// Generic Reusable Template of anything in the game.
class Thing {
    constructor(assetName = 'PH.png', pos = new XYZ()) {
        this.assetName = assetName;
        this.pos = pos;
        this.onScreenBorder = false;
    }

    get Asset() {
        return '/images/visceralgrove/' + this.assetName
    }

    // draw call
    Draw(img){
        //TODO: Refactor rendering to redraw when needed, maintaining all needed sprites on screen as well.
        render2D.drawImage(img, XYZ.Normalize(this.pos.x), XYZ.Normalize(this.pos.y));
    }

    // render pipeline
    Render(){
        const img = new Image();
        img.onload = ()=>{
            this.Draw(img);
        }
        img.onerror = (e)=>{
            console.error(e, '\nunable to load Image:', JSON.stringify(img));
        }
        img.src = this.Asset
    }

    Update(eu){

    }
}

// TODO: Refactor to be just a Thing Controller, which can be added to any thing, allowing for non-player movement as well. Hmmm
// Player, for now
class ControllableThing extends Thing {
    constructor(assetName = 'PH.png', pos = new XYZ(), controlled = false) {
        super(assetName, pos);
        this.controlled = controlled;
    }

    get Up(){
        return 'ArrowUp'
    }
    get Down(){
        return 'ArrowDown'
    }
    get Left(){
        return 'ArrowLeft'
    }
    get Right(){
        return 'ArrowRight'
    }

    RequestMovement() {
        //TODO: Read tiles in a radius before engaging in movement

        let newPos = new XYZ(this.pos.x, this.pos.y);
        const step = 1;

        if (controller[this.Up]){
            newPos.y -= step;
        }
        if (controller[this.Down]){
            newPos.y += step;
        }
        if (controller[this.Left]){
            newPos.x -= step;
        }
        if (controller[this.Right]){
            newPos.x += step;
        }

        if (newPos.x !== this.pos.x || newPos.y !== this.pos.y) {
            const atXBound = newPos.x === XYZ.GRID.x || newPos.x === -step;
            const atYBound = newPos.y === XYZ.GRID.y || newPos.y === -step;
            this.onScreenBorder = atXBound || atYBound;

            if (this.onScreenBorder) {
                console.log('screen bounds reached')
                if (atXBound) {
                    newPos.x = newPos.x > 0 ? 0 : XYZ.GRID.x - 1;
                }
                if (atYBound) {
                    newPos.y = newPos.y > 0 ? 0 : XYZ.GRID.y - 1;
                }
            }

            this.pos.x = newPos.x;
            this.pos.y = newPos.y;
            this.Render();
        }
    }

    Update(eu){
        if (this.controlled) {
            this.RequestMovement()
        }
    }
}



export const vg = new VisceralGrove();
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
window.addEventListener('keydown', function(e){
    controller[e.key] = true;
})
window.addEventListener('keyup', function(e){
    controller[e.key] = false;
})



export const debug = true;
const debugGrid = true;

if (debug){
    console.log("Debug:", debug);
    if (debugGrid){
        vg.IterateOnGrid((pos) => {
            render2D.strokeStyle = 'blue'
            render2D.strokeRect(XYZ.Normalize(pos.x), XYZ.Normalize(pos.y), XYZ.TILE, XYZ.TILE)
        })
    }
}

vg.IterateOnGrid((pos) => {
    if (pos.x === 3 && pos.y === 3) {
        const ct = new ControllableThing('Sprite-0001.png', pos, true);
        ct.Render();
        processes.push(ct);
    }
})