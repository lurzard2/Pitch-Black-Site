import { debug, tiledWorld, XYZ } from '../game.js'

export class Scene {
    constructor() {
        this._worldPos = this.#GetInitPos()
    }

    #GetInitPos() {
        return tiledWorld.originPos
        //TODO: check savedata or override with world origin pos conditionally
    }

    ChangePos(newPos, absolute = false) {
        const relativePos = new XYZ(this._worldPos.x + newPos.x, this._worldPos.y + newPos.y)
        this._worldPos = absolute ? newPos : relativePos
        if (debug) { console.debug('CAMERA CHANGE!', this._worldPos.ToString) }
    }
}