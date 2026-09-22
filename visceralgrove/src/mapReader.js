import {SlimeGridLoop, world} from "../game";

const LayerType = {
    tile: 'tilelayer',
    obj: 'objgroup'
}

export class Map {
    constructor(pos) {
        this.pos = pos
    }

    get GetMap() { return world.maps[this.pos.ToString]['map'] }

    #ReadTileLayer(layer, callback) {
        SlimeGridLoop(layer.data.length, (i, pos) => {
            if (layer.data[i] > 0) {
                callback(layer.data[i], pos);
            }
        })
    }

    #ReadObjLayer(layer, callback) {
        //TODO: obj reading
    }

    ReadMap() {
        for (const layer of this.GetMap.layers) {

            if (layer.type === LayerType.tile) {
                this.#ReadTileLayer(layer,(int, pos) => {
                    //TODO: static sprites
                })
            }

            if (layer.type === LayerType.obj) {
                this.#ReadObjLayer(layer,(obj) => {

                })
            }
        }
    }
}