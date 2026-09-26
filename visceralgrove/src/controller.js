import {XYZ, scene, debug} from '../game.js'



const inputStorage = []

window.addEventListener('keydown', function(e) {
    if (debug) { console.debug(e.key) }
    inputStorage[e.key] = true
})
window.addEventListener('keyup', function(e) {
    inputStorage[e.key] = false
})



export class Controller {
    static Input(keyString) {
        return inputStorage[keyString]
    }

    static get GetInputDirections() {
        return {
                U: this.Input('ArrowUp'),
                D: this.Input('ArrowDown'),
                L: this.Input('ArrowLeft'),
                R: this.Input('ArrowRight'),
        }
    }
}