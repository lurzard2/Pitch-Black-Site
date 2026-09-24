import {debug, SlimeGridLoop, world, XYZ} from '../game.js';

const LayerType = {
    tile: 'tilelayer',
    obj: 'objectgroup',
    group: 'group'
}

export class MapReader {
    constructor(pos) {
        this._pos = pos
        this._mapReference = world.maps[this._pos.ToString]['map']

        this._output = {
            collisions: [],
            spawns: [],
            staticTiles: [],
        }
    }



    #ReadGroupLayer(layer) {
        const t = layer.type;
        const n = layer.name.toLowerCase();

        if (debug) { console.debug('READING MAP LAYER:', t, n) }

        if (t === LayerType.tile) {
            this.#ReadTileLayer(layer,(int, pos) => {
                if (n === 'collisions') {
                    this._output.collisions.push(pos.ToString);
                }
                else {
                    this._output.staticTiles.push({ val: int, pos: pos.ToString });
                }
            })
        }

        else if (t === LayerType.obj) {
            this.#ReadObjectLayer(layer,(obj, pos) => {
                if (n === 'spawns') {
                    const truePos = pos.Demormalized.Floor
                    this._output.spawns.push({ name: obj.name, pos: truePos.ToString });
                }
            })
        }

        else if (t === LayerType.group) {
            for (const layer2 of layer.layers) {
                // group layers inside will contain inner layers, so just loop recursively if we encounter one, read everything all the way down.
                this.#ReadGroupLayer(layer2)
            }
        }
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
            // object positions are free in Tiled compared to tileset tiles.
            // floor pos to matches grid-tile dimensions.
            const pos = new XYZ(obj.x, obj.y);
            callback(obj, pos);
        }
    }



    get ReadMap() {
        const mapLayers = this._mapReference.layers;

        for (const layer of mapLayers) {
            // the map is a layer array, we can just loop through recursively.
            // the map's layers array has no type, so no need to check for group type here.
            this.#ReadGroupLayer(layer)
        }

        if (debug) { console.debug(`MAP ${this._pos.ToString} READ:`, this._output) }
        return this._output;
    }
}