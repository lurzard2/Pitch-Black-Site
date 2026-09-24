import { MapInitializer } from './mapInitializer.js'
import { debug } from '../game.js'

export class VGMap {
    constructor(pos) {
        this.initMap = new MapInitializer(pos)
        if (debug) { console.debug('VGMap initializing...', this.initMap) }
    }

    Render() {
        //TODO: need to make a rendering pipeline
    }
}