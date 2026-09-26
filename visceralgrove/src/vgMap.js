import { app } from '../game.js'
import { SpriteFactory } from './spriteFactory.js'

export class VGMap {
    constructor(abstractMap) {
        this.data = abstractMap
        this.staticRenderables = this.#GetStaticRenderables
    }

    Render() {
        for (const sprite of this.staticRenderables) {
            app.stage.addChild(sprite)
        }
    }

    //TODO: more
    get #GetStaticRenderables() {
        const collection = []

        for (const t of this.data.staticTiles) {
            collection.push
            (
                SpriteFactory.GetNewSpriteFromTile({
                tileset: t.associatedTileset,
                val: t.val,
                pos: t.pos.Normalized
                })
            )
        }

        return collection
    }
}