import {SlimeGridLoop, world} from "../game";

const LayerType = {
    tile: 'tilelayer',
    obj: 'objgroup',
    group: 'group'
}

export class MapReader {
    constructor(pos) {
        this.pos = pos
        this.mapObj = world.maps[this.pos.ToString]['map']
    }



    #ReadGroupLayer(layer) {
        for (const layer of layer.layers) {
            // group layers inside will contain inner layers, so just loop recursively if we encounter one, read everything all the way down.
            this.#ReadGroupLayer(layer)
        }
        this.#ReadLayer(layer)
    }

    #ReadTileLayer(layer, callback) {
        SlimeGridLoop(layer.data.length, (i, pos) => {
            if (layer.data[i] > 0) {
                callback(layer.data[i], pos);
            }
        })
    }

    #ReadObjectLayer(layer, callback) {
        for (const obj of layer.objects){
            callback(obj);
        }
    }



    #ReadLayer(layer) {
        if (layer.type === LayerType.tile) {
            this.#ReadTileLayer(layer,(int, pos) => {
                //TODO: creating sprites
            })
        }

        if (layer.type === LayerType.obj) {
            this.#ReadObjectLayer(layer,(obj) => {
                //TODO: read object data
            })
        }
    }



    ReadMap() {
        const mapLayers = this.mapObj.layers;

        for (const layer of mapLayers) {
            // the map is a layer array, we can just loop through recursively.
            // the map's layers array has no type, so no need to check for group type here.
            this.#ReadGroupLayer(layer)
        }
    }
}