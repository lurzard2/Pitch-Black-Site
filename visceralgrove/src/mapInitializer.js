import { MapReader } from './mapReader.js'
import { SpriteFactory } from './spriteFactory.js'
import { world } from '../game.js'

export class MapInitializer {
    constructor(pos) {
        this._pos = pos;
        this.initData = new MapReader(pos).GetOutput
        this.tiles = this.GetTiles
    }

    get GetTiles() {
        for (const t of this.initData.staticTiles) {
            this.tiles.push(SpriteFactory.GetNewTileSprite(t))
        }
    }
}