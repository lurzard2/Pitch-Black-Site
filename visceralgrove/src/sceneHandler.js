import {Assets, Graphics, Rectangle, Sprite, Texture} from '/js/pixi.mjs'
import {
    globalClock,
    directory,
    worldLoader,
    TILE,
    XYZ,
    SearchGrid,
    app,
    debug,
    LoopThroughGrid,
    SlimeGridLoop
} from "./game.js";



export class SceneHandler {
    constructor(pos = new XYZ()) {
        this.pos = pos;
        globalClock.addOnce(() => { this.RenderScene() })
    }


    //TODO: refactor. We need better accessibility
    get Map(){
        return worldLoader.maps[this.pos.ToString];
    }


    set ChangeMapPos(pos) {
        this.pos = pos;
    }

    async LoadAllAssets() {
        for (const ts of this.Map.tilesets) {
            await Assets.load({ alias: ts.name, src: 'tiled/tilesets/'+ts.image })
        }
    }

    GetNewTexture(alias, indexOfSheet = 0, size = new XYZ(16, 16)) {
        indexOfSheet -= 1
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
                const sprite = this.GetNewSprite(this.GetNewTexture(ts.name, int, ts.size), pos);
                return sprite;
            }
        }
    }

    RenderScene() {
        for (const layer of this.Map.layers) {
            if (layer.type !== 'tilelayer') { continue; }
            SlimeGridLoop(layer.data.length,(i, pos) => {
                if (layer.data[i] > 0){
                    app.stage.addChild(this.GetTileAsSpriteFromGID(layer.data[i], pos.Normalized))
                }
            })
        }
    }
}