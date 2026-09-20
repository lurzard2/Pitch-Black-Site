import {Assets, Graphics, Rectangle, Sprite, Texture} from '/js/pixi.mjs'
import {
    globalClock,
    directory,
    world,
    TILE,
    XYZ,
    SearchGrid,
    app,
    debug,
    LoopThroughGrid,
    SlimeGridLoop,
    pixiDirectory
} from "../game.js";



export class SceneHandler {
    constructor(pos = new XYZ()) {
        this.pos = pos;
        globalClock.addOnce(() => { this.RenderScene() })
    }


    //TODO: refactor. We need better accessibility
    get Map(){
        return world.maps[this.pos.ToString]['map'];
    }


    set ChangeMapPos(pos) {
        this.pos = pos;
    }

    GetNewTexture(alias, indexOfSheet = 0, size = new XYZ(16, 16)) {
        const x = indexOfSheet % size.x * TILE;
        const y = Math.floor(indexOfSheet / size.x) * TILE

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