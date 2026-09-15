import * as VG from './game.js';

export class Camera {
    constructor(pos = new VG.XYZ()) {
        this.pos = pos;
        this.destPos = new VG.XYZ();
        this.loadedMap = {}
        VG.PushUpdatableProcess(this)
    }

    set #ChangeX(val) {
        this.destPos.x = val;
    }
    set #ChangeY(val) {
        this.destPos.y = val;
    }

    Update(eu) {

    }



    // Use position to get equal pos in the level data to read and retain everything needed in order to render a screen.
    OldCamDraw() {
        const layers = VG.world.lvl['layers'] ?? []
        const tileSets = VG.world.tileSets;
        //console.log(layers, tileSets);

        const pos = new VG.XYZ(-1, 0);

        for (const layer of layers) {
            for (const tile of layer['data']){
                pos.x += 1
                if (pos.x === VG.GRID.x){
                    pos.x = 0
                    pos.y += 1
                }

                if (tile !== 0){

                    const t = new VG.Tile(new VG.VGImage(), pos);
                    t.Render()
                }

                //console.log(tile, pos)
            }
        }
    }
}