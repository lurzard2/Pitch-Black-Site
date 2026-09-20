import {Load, Save} from '/js/main.js';
import {debug, globalClock} from '../game.js';

const sessionKey = 'vgsession'
const localKey = 'vgstate'

export class SaveManager {
    constructor() {
        this.session = this.#SaveLoad
        globalClock.add(() => { this.#Update() });
    }

    #Update() {
        this.#SaveProgress()
    }

    get #SessionData() {
        return Load(sessionKey, true)
    }
    get #SavedData() {
        return Load(localKey)
    }

    #SaveProgress() {
        Save(sessionKey, this.session, true)
    }
    ActuallySaveProgress() {
        Save(localKey, this.session)
    }

    get #SaveLoad() {
        // get session first, get local second, and create it last
        const data = (this.#SessionData || this.#SavedData) ?? {
            mapPos: 0,
            cellPos: 0
        }
        if (debug) { console.debug('SAVEDATA:', data) }
        this.#SaveProgress()
        return data
    }
}