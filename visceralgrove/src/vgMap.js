import { MapInitializer } from './mapInitializer.js';

export class VGMap {
    constructor(pos) {
        this.initMap = new MapInitializer(pos)
    }

    Render() {
        //TODO: need to make a rendering pipeline
    }
}