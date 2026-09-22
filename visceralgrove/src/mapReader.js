import {SlimeGridLoop, world} from "../game";

const LayerType = {
    tile: 'tilelayer',
    obj: 'objgroup',
    group: 'group'
}

export class Map {
    constructor(pos) {
        this.pos = pos
    }

    get GetMap() { return world.maps[this.pos.ToString]['map'] }



    #ReadGroupLayer(layer) {
        for (const layer of layer.layers) {
            // group layers inside are defined by type group, so just loop recursively if we encounter one until something can be parsed.
            if (layer.type === LayerType.group) {
                this.#ReadGroupLayer(layer)
            }
        }
        this.#ReadLayer(layer)
    }

    #ReadLayer(layer) {
        if (layer.type === LayerType.tile) {
            this.#ReadTileLayer(layer,(int, pos) => {
                //TODO: creating sprites
            })
        }

        if (layer.type === LayerType.obj) {
            //TODO: read object data
        }
    }

    #ReadTileLayer(layer, callback) {
        SlimeGridLoop(layer.data.length, (i, pos) => {
            if (layer.data[i] > 0) {
                callback(layer.data[i], pos);
            }
        })
    }



    ReadMap() {
        const mapLayers = this.GetMap.layers;

        for (const layer of mapLayers) {
            // the map is a layer array, we can just loop through recursively.
            // the map's layers array has no type, so no need to check for group type here.
            this.#ReadGroupLayer(layer)
        }
    }
}