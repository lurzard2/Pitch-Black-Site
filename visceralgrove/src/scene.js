import { debug, internalWorld, XYZ } from '../game.js'
import { VGMap } from './vgMap.js'
import { GameData } from './gameData.js'
import {MapReader} from './mapReader.js'

let pos = null
let realizedMap = null

export class Scene {
    constructor() {
        pos = GameData.GetFromString('worldPos', internalWorld.originPos)

        realizedMap = new MapReader(pos).GetOutput

        this.playerPositions = GameData.GetFromString('playerPositions', [])
        if (pos.Equals(internalWorld.originPos)) {
            this.playerPositions.push(realizedMap.spawns['0'].pos)
        }
    }

    ChangePos(newPos, absolute = false) {

        const relativePos = new XYZ(pos.x + newPos.x, pos.y + newPos.y)
        pos = absolute ? newPos : relativePos

        if (debug) {
            console.debug('CAMERA CHANGE!', pos.ToString)
        }
    }
}