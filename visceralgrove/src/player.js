import {MapObject} from "./mapObject.js";
import {Controller} from "./controller.js";
import {app, globalClock, scene, SCREEN, TILE, XYZ} from "../game.js";

export class Player extends MapObject {
    constructor(pos) {
        super(pos);
        window.addEventListener('keydown', e => {
            const input = Controller.GetInputDirections

            const inc = 2
            if (input.U) {
                if (pos.y <= 0) {
                    scene.ChangePos(new XYZ(0, 1))
                    pos.y = SCREEN.y
                }
                this.pos.y -= inc
            }
            if (input.D) {
                if (pos.y >= SCREEN.y) {
                    scene.ChangePos(new XYZ(0, -1))
                    pos.y = 0
                }
                this.pos.y += inc
            }
            if (input.R){
                if (pos.x >= SCREEN.x) {
                    scene.ChangePos(new XYZ(1))
                    pos.x = 0
                }
                this.pos.x += inc
            }
            if (input.L){
                if (pos.x <= 0) {
                    scene.ChangePos(new XYZ(-1))
                    pos.x = SCREEN.x
                }
                this.pos.x -= inc
            }
            console.log(this.pos)
        })
    }
}