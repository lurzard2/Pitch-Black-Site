import { debug, internalWorld, XYZ, abstractMaps} from '../game.js'
import { VGMap } from './vgMap.js'
import { GameData } from './gameData.js'



let pos = null
let abstractMap = null
let realizedMap = null

export class Scene {
    constructor() {
        pos = GameData.GetFromString('worldPos', internalWorld.originPos)

        abstractMap = abstractMaps[pos.ToString]

        this.playerPositions = GameData.GetFromString('playerPositions', [])
        if (pos.Equals(internalWorld.originPos)) {
            this.playerPositions.push(abstractMap.spawns['0'].pos)
        }

        realizedMap = new VGMap(abstractMap)
    }

    #Reset() {
        abstractMap = null
        realizedMap = null

        try {
            abstractMap = abstractMaps[pos.ToString]
            realizedMap = new VGMap(abstractMap)
        }
        catch (e) {
            console.warn(`Unable to load map from ${pos.ToString}\n`)
        }
    }

    ChangePos(newPos, absolute = false) {

        const relativePos = new XYZ(pos.x + newPos.x, pos.y + newPos.y)
        pos = absolute ? newPos : relativePos
        this.#Reset()

        if (debug) {
            console.debug('CAMERA CHANGE!', pos.ToString)
        }
    }
}