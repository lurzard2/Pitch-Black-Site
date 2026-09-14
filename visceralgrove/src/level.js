import * as VG from './game.js'

export class Level {
    constructor(lvlName) {
        this.lvlName = lvlName;
        this.lvlStr = ''
        this.lvl = {}

    }

    async LoadLvl() {
        const loadRq = new Request(VG.directory+'levels/'+ this.lvlName);
        const re = await fetch(loadRq);
        if (!re.ok) {
            console.log(this.lvlName, 'INVALID!!!');
            return ''
        } else {
            const lvlStr = await re.text()
            console.log('Okay. Yay. ❤️')
            return lvlStr;
        }
    }
}