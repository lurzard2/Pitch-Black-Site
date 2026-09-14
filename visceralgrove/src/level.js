import * as VG from './game.js'

export class Level {
    constructor() {
        this.lvlName = document.title+'.json';
        this.lvl = {}
        this.tileSets = {}
    }

    // this.lvl
    async LoadLvl() {
        return JSON.parse(await this.GetJSONFileAsStr('levels/' +'Map-'+this.lvlName));
    }

    // this.tileSets
    async LoadTilesets(){
        const tilesets = []
        for (const ts of this.lvl.tilesets){
            tilesets.push({ fgid: ts.firstgid, src: ts.source, data: '' })
        }
        return tilesets
    }

    async GetJSONFileAsStr(filePath) {
        const loadRq = new Request(VG.directory+filePath);
        const re = await fetch(loadRq);
        if (!re.ok) {
            console.log(re.text(), 'INVALID!!!');
            return '';
        } else {
            const retStr = await re.text()
            console.log('Okay. Yay. ❤️')
            return retStr;
        }
    }
}