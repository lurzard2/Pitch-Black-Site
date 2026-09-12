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
class Game {
    constructor() {
        this.Canvas.width = XYZ.SCREEN.x;
        this.Canvas.height = XYZ.SCREEN.y;
    }

    get XYZ(){
        return new XYZ();
    }

    get Canvas() {
        return document.getElementById("visceralgrove");
    }
    get RenderCtx() {
        return this.Canvas.getContext('2d');
    }

    IterateOnGrid(callBack){
        for (let x = 0; x < XYZ.GRID.x; x++){
            for (let y = 0; y < XYZ.GRID.y; y++){
                callBack(new XYZ(x, y));
            }
        }
    }
}

class Thing {
    constructor(assetName = 'PH.png', pos = new XYZ()) {
        this.assetName = assetName;
        this.pos = pos;
    }

    get Asset() {
        return '/images/visceralgrove/' + this.assetName
    }

    // draw call
    Draw(img){
        game.RenderCtx.drawImage(img, XYZ.Normalize(this.pos.x), XYZ.Normalize(this.pos.y));
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
}

export const game = new Game();


const debug = true;
const debugGrid = true;

if (debug){
    console.log("Debug:", debug);
    if (debugGrid){
        game.IterateOnGrid((pos) => {
            //game.RenderCtx.strokeStyle = 'blue'
            //game.RenderCtx.strokeRect(XYZ.Normalize(pos.x), XYZ.Normalize(pos.y), XYZ.TILE, XYZ.TILE)
            const t = new Thing(undefined, pos);
            t.Render();
        })
    }
}