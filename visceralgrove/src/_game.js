// Coordinate system
export class XYZ {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Getting either a normalized single value or a normalized XY
    Normalize(val) { return XYZ.Normalize(val) }
    static Normalize(val) { return val * XYZ.TILE }
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
class Game{
    constructor() {
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
                callBack(x, y);
            }
        }
    }
}

const game = new Game();
game.Canvas.width = XYZ.SCREEN.x;
game.Canvas.height = XYZ.SCREEN.y;







const debug = true;
const debugGrid = true;

if (debug){
    console.log("Debug:", debug);
    if (debugGrid){
        game.IterateOnGrid((x, y) => {
            game.RenderCtx.strokeStyle = 'blue'
            game.RenderCtx.strokeRect(XYZ.Normalize(x), XYZ.Normalize(y), XYZ.TILE, XYZ.TILE)
        })
    }
}

game.IterateOnGrid((x, y) => {
    const img = new Image();
    img.onload = ()=>{
        game.RenderCtx.drawImage(img, XYZ.Normalize(x), XYZ.Normalize(y))
    }
    img.src = '/images/visceralgrove/Sprite-0004.gif'
})