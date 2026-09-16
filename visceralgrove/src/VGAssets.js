import { Assets,  Graphics } from '/js/pixi.mjs'
import {directory, TILE, XYZ} from "./game.js";

/*
We don't actually need to mess with pixi too much for rendering,
just for its utilities to support objects and load times.

Instead we can utilize a big handler for creating various kinds of assets that are used within the game
I'm a bit 'inspired' by futile, or rather, that's all I have experience in.
So I will recreate some things I need
And bake in certain properties that will be global across the game so they don't need to be defined per-asset.
*/

class VGAsset {
    constructor() {

    }
}

export class VGAssets {
    constructor() {

    }
}