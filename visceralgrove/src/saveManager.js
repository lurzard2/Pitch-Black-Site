/*

Hi.
Yes the site's 'savefile' is saved on the client.
This is a singleplayer game and your progress is stored locally.

By viewing the source code you acknowledge your experience will be permanently affected.
Neither positive, nor negative,
Just affected.

These experiences are intended to be experienced BLIND.
Viewing internal functioning could expose things otherwise not meant to be seen.
Or possibly, hidden for you to find...
I ask you wait until you are ready to proceed, to do this.

BE WARY OF SPOILERS.
DO NOT LEAK.
DO NOT SABOTAGE.
PLEASE ENJOY WHAT IS HERE IN A FAITHFUL WAY.
AND HAVE FUN.
THAT IS ALL.

*/



import {Load, Save} from '/js/main.js';
import {debug, globalClock} from '../game.js';

const sessionKey = 'vgsession'
const localKey = 'vgstate'

//TODO: support exports and imports.

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