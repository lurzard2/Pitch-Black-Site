class XYZ{
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// 16x16 source resolution for all assets
const TILE_SIZE = 16;
// 12x8 grid resolution
const GRID_DIM = new XYZ(12, 8);
const CANVAS_DIM = new XYZ(GRID_DIM.x * TILE_SIZE, GRID_DIM.y * TILE_SIZE);

// TODO: Source res 16x16, Display res 32x32




class LevelContext{
    constructor(tilesContext){
        this.originCoord = new XYZ(0,0);
        this.tilesContext = tilesContext;
    }
}




const canvas = document.getElementById("visceralgrove");
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_DIM.x;
canvas.height = CANVAS_DIM.y;

function ShowDebugGrid(){
    for (let x = 0; x < GRID_DIM.x; x++){
        for (let y = 0; y < GRID_DIM.y; y++){
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    console.log('showing debug grid');
}
ShowDebugGrid();