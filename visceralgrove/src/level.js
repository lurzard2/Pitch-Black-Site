import * as VG from './game.js'

let lvl = null;

export async function LoadLevel(jsonStr) {
    const loadRq = new Request(VG.directory+'levels/'+ jsonStr);
    const re = await fetch(loadRq);
    if (!re.ok) {
        console.log(jsonStr, 'INVALID!!!');
    } else {
        const lvlStr2 = await re.text()
        lvl = JSON.parse(lvlStr2)
        console.log(lvl, 'Okay. Yay. ❤️')
    }
}