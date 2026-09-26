import { debug, internalWorld, XYZ } from '../game.js'
import { VGMap } from './vgMap.js'
import { GameData } from './gameData.js'

let pos = null

export class Scene {
    constructor() {
        pos = GameData.GetFromString('worldPos', internalWorld.originPos)
        this.playerPositions = []
    }

    ChangePos(newPos, absolute = false) {

        const relativePos = new XYZ(pos.x + newPos.x, pos.y + newPos.y)
        pos = absolute ? newPos : relativePos

        if (debug) {
            console.debug('CAMERA CHANGE!', pos.ToString)
        }
    }
}