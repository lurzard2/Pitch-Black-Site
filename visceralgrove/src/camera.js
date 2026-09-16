import { Assets,  Graphics, Sprite } from '/js/pixi.mjs'
import {directory, world, TILE, XYZ, PushUpdatableProcess, LoopThroughGrid} from "./game.js";

/*
We don't actually need to mess with pixi too much for rendering,
just for its utilities to support objects and load times.

Instead we can utilize a big handler for creating various kinds of assets that are used within the game
I'm a bit 'inspired' by futile, or rather, that's all I have experience in.
So I will recreate some things I need
And bake in certain properties that will be global across the game so they don't need to be defined per-asset.
*/



export class Camera {
    constructor() {
        PushUpdatableProcess(this);
        this.loadedMap = {
            layers: {}
        }

        // temp
        this.loadedMap = world.maps[world.originPos.ToString]
    }

    LoadMap(map) {
        this.loadedMap = map;
    }

    Update(eu) {
        this.DrawCamera(eu)
    }

    DrawCamera(eu) {
        for (const layer of this.loadedMap['layers']) {
            LoopThroughGrid((pos) => {
                for (const int of layer['data']) {
                    if (int > 0){
                        // render
                    }
                }
            })
        }
    }
}