import { Save,Load } from '/js/main.js'
import { globalClock } from '../game.js'



const sesKey = 'vgsession'

Save(sesKey, {}, true)

let saveData = null



export class GameData {
    static get #Get() {
        if (saveData === null) {
            saveData = GameData.#CreateData
        }

        globalClock.addOnce(() => { GameData.#Save() })

        return saveData
    }

    static get #CreateData() {
        return Load(sesKey, true) ?? {
            worldPos: undefined
        }
    }

    static GetFromString(keyString, optionalAssign = undefined) {
        if (optionalAssign !== undefined) {
            GameData.#Get[keyString] = optionalAssign
        }

        return GameData.#Get[keyString]
    }


    static #Save() {
        Save(sesKey, saveData, true)
    }

    static ActuallySave() {
        Save('vgsaved', saveData)
    }
}