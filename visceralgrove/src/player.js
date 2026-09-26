import {MapObject} from "./mapObject.js";
import {Controller} from "./controller.js";

export class Player extends MapObject {
    constructor(pos) {
        super(pos);
        window.addEventListener('keydown', e => {
            const input = Controller.GetInputDirections
            if (input.U) {
                this.pos.y -= 1
            }
            if (input.D) {
                this.pos.y += 1
            }
            if (input.R){
                this.pos.x += 1
            }
            if (input.L){
                this.pos.x -= 1
            }
            console.log(this.pos)
        })
    }
}