import { Assets,  Graphics, Sprite, Texture } from '/js/pixi.mjs'
import {globalClock, directory, worldLoader, TILE, XYZ, LoopThroughGrid} from "./game.js";



export class SceneHandler {
    constructor(pos = new XYZ()) {
        this.pos = pos;
    }


    get Map(){
        return worldLoader.maps[this.pos.ToString];
    }


    set ChangeMapPos(pos) {
        this.pos = pos;
    }

    async LoadAllAssets() {
        const tilesets = this.Map['tilesets'];
        for (const ts of tilesets) {
            await Assets.load({ alias: ts['name'], src: 'tiled/tilesets/'+ts['image'] })
        }
    }

    RenderScene() {

    }
}