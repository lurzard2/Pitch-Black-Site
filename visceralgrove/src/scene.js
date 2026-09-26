import {debug, internalWorld, XYZ, abstractMaps, globalClock, GetInput} from '../game.js'
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

        globalClock.add(() => { realizedMap?.Render() })
    }

    #Reset() {
        abstractMap = null
        realizedMap = null

        // Maps are kinda like canvases in a gallery, you'll come across a lot but there might be empty space here and there...
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