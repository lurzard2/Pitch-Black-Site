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