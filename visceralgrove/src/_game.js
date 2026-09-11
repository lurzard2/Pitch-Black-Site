import { XYZ } from "./_xyz.js";

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
            game.RenderCtx.strokeRect(XYZ.Normalize(x), XYZ.Normalize(y), XYZ.TILE, XYZ.TILE)
        })
    }
}