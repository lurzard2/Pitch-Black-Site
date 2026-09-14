import * as VG from './game.js';
import {VGImage} from "./game.js";

export class Camera {
    constructor(pos = new VG.XYZ()) {
        this.pos = pos;
        this.destPos = new VG.XYZ();
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
    LoadLvlScreen() {
        const lvl = VG.level.lvl
        const layers = lvl.layers ?? []
        const assets = lvl.tilesets ?? []
        console.log('level loading!', '\nLayers:', layers,'\nAssets', assets)

        const pos = new VG.XYZ(-1, 0);

        for (const layer of layers) {
            for (const tile of layer.data){
                pos.x += 1
                if (pos.x === VG.GRID.x){
                    pos.x = 0
                    pos.y += 1
                }

                if (tile !== 0){

                    const t = new VG.Tile(new VGImage(), pos);
                    t.Render()
                }

                //console.log(tile, pos)
            }
        }
    }
}