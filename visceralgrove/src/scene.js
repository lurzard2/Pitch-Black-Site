import { debug, internalWorld, XYZ, abstractMaps, globalClock } from '../game.js'
import { VGMap } from './vgMap.js'
import { GameData } from './gameData.js'



let pos = null

let abstractMap = null
let realizedMap = null

let playerPositions = []

export class Scene {
    constructor() {
        pos = GameData.GetFromString('worldPos', internalWorld.originPos)

        abstractMap = abstractMaps[pos.ToString]

        playerPositions = GameData.GetFromString('playerPositions', [])
        if (pos.Equals(internalWorld.originPos)) {
            playerPositions.push(abstractMap.spawns['0'].pos)
        }

        realizedMap = new VGMap(abstractMap)

        globalClock.add(() => {
            realizedMap?.Render()
        })
    }

    #Reset() {
        abstractMap = null
        realizedMap = null
        try {
            abstractMap = abstractMaps[pos.ToString]
            realizedMap = new VGMap(abstractMap)
        }
        catch (e) {
            console.info(`Empty ${pos.ToString}`)
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