import * as VG from './game.js'

const lvlStr = document.title
let lvl = null;

export async function Load() {
    const loadRq = new Request(VG.assetsPath + 'levels/' + lvlStr + '.json');
    const re = await fetch(loadRq);
    if (!re.ok) {
        console.log(lvlStr, 'INVALID!!!');
    } else {
        const lvlStr2 = await re.text()
        lvl = JSON.parse(lvlStr2)
        console.log(JSON.stringify(lvl))
    }
}