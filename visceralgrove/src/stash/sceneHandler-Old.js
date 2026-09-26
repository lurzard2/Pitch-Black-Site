import {Assets, Graphics, Rectangle, Sprite, Texture} from '/js/pixi.mjs'
import {
    globalClock,
    directory,
    internalWorld,
    TILE,
    XYZ,
    app,
    debug,
    SlimeGridLoop,
    pixiDirectory
} from "../../game.js";



export class SceneHandler {
    constructor(pos = new XYZ()) {
        this.pos = pos;
        this.pos = internalWorld.originPos
        globalClock.addOnce(() => { this.RenderScene() })
    }


    //TODO: refactor. We need better accessibility
    get Map(){
        return internalWorld.maps[this.pos.ToString]['map'];
    }


    set ChangeMapPos(pos) {
        this.pos = pos;
    }

    GetNewTexture(alias, indexOfSheet = 0, size = new XYZ(16, 16)) {
        // clamp-loop x to width
        const x = indexOfSheet % size.x * TILE;
        // clamp-loop y to height based on x loops
        const y = Math.floor(indexOfSheet / size.x) * TILE

        // we have to manually create a texture in order to trim image contents for the specific tile
        return new Texture({
            source: Assets.get(alias).source,
            frame: new Rectangle(x, y, TILE, TILE)
        })
    }


    GetNewSprite(tex, pos) {
        return new Sprite({
            texture: tex,
            position: { x: pos.x, y: pos.y },
        })
    }

    GetTileAsSpriteFromGID(int, pos) {
        for (let i = this.Map.tilesets.length - 1; i >= 0; i--) {
            const ts = this.Map.tilesets[i];
            const gid = ts.firstgid;
            if (gid <= int) {
                const sprite = this.GetNewSprite(this.GetNewTexture(ts.name, int - gid, ts.size), pos);
                return sprite;
            }
        }
    }

    RenderScene() {
        for (const layer of this.Map.layers) {
            if (layer.type === 'tilelayer') {
                SlimeGridLoop(layer.data.length,(i, pos) => {
                    if (layer.data[i] > 0){
                        app.stage.addChild(this.GetTileAsSpriteFromGID(layer.data[i], pos.Normalized))
                    }
                })
            }
            if (layer.type === 'objectgroup') {
                for (const obj of layer.objects) {
                    console.debug(obj);
                }
            }
        }
    }
}