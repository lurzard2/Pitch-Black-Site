import { XYZ, TILE } from '../game.js'
import {Texture, Rectangle, Assets, Sprite} from '/js/pixi.mjs'

export class SpriteFactory {

    static #ConstructNewTileTexture(assetAlias, indexOfSheet, sizeOfSource = new XYZ(TILE, TILE), sizeOfTile = new XYZ(TILE, TILE)) {
        // x -> width
        const selectedTileX = indexOfSheet % sizeOfSource.x * sizeOfTile.x;
        // y -> height (based on x loops)
        const selectedTileY = Math.floor(indexOfSheet / sizeOfSource.x) * sizeOfTile.y;

        // we have to manually create a texture in order to trim image contents for the specific tile
        return new Texture({
            source: Assets.get(assetAlias).source,
            frame: new Rectangle(selectedTileX, selectedTileY, sizeOfTile.x, sizeOfTile.y),
        })
    }

    static #ConstructNewSprite(tex, pos) {
        return new Sprite({
            texture: tex,
            position: { x : pos.x, y: pos.y },
        })
    }

    static GetNewSpriteFromTile({ tileset = {}, val = 0, pos = new XYZ() }) {
        const ts = tileset;

        const indexOfSheet = val - ts.firstgid

        const imageSize = new XYZ(ts['imagewidth'], ts['imageheight'])
        const tileSize = new XYZ(ts['tilewidth'], ts['tileheight'])

        const sprite = SpriteFactory.#ConstructNewSprite
        (
            SpriteFactory.#ConstructNewTileTexture(ts.name, indexOfSheet, imageSize, tileSize),
            pos
        )

        return sprite
    }


}