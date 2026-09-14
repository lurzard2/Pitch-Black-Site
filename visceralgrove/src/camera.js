import * as VG from './game.js';

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

    Update(eu){
    }

    // Use position to get equal pos in the level data to read and retain everything needed in order to render a screen.
    LoadLvlScreen() {

    }
}