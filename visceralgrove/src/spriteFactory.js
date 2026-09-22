import { XYZ, TILE } from "../game";
import {Texture, Rectangle, Assets, Sprite} from '/js/pixi.mjs'

export class SpriteFactory {

    static #ConstructNewTexture(assetAlias, indexOfSheet, sizeOfSource = new XYZ(TILE, TILE), sizeOfTile = new XYZ(TILE, TILE)) {
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

    //TODO: this is ugly, refactor later
    static #FindCorrectTilesetFromTileValue(indexOfTileset, tilesets) {
        for (let i = tilesets.length - 1; i >= 0; i--) {
            const ts = tilesets[i];
            const gid = ts.firstgid;

            // gid bounds tile values to be only less or exactly its value, depending on the tile's index inside the tileset. try saying that 5 times fast.
            if (gid <= indexOfTileset) {
                return ts;
            }
        }
    }

    static GetNewTileSprite(indexOfTileset, tilesets, pos) {
        const ts = SpriteFactory.#FindCorrectTilesetFromTileValue(indexOfTileset, tilesets);

        const indexOfSheet = indexOfTileset - ts.firstgid

        const imageSize = new XYZ(ts['imagewidth'], ts['imageheight'])
        const tileSize = new XYZ(ts['tilewidth'], ts['tileheight'])

        const sprite = SpriteFactory.#ConstructNewSprite
        (
            SpriteFactory.#ConstructNewTexture(ts.name, indexOfSheet, imageSize, tileSize),
            pos
        )

        return sprite
    }


}