import * as VG from './game.js'

// Hold level data
export class World {
    constructor(name) {
        this.name = name;
        this.originPos = new VG.XYZ()
        this.loadedWorld = {}
        this.maps = {}
        this.cachedParses = {}
    }

    // Build an optimized map object from parsed data
    async ParseMap(mapString){
        const parsed = await this.Parse(this.Path + `worlds/${this.name}/` + mapString)

        // we have to interpret and trim the data from these collections
        const layers = parsed['layers']
        const interpretedLayers = []
        const tilesets = parsed['tilesets']
        const interpretedTilesets = []

        // interpret 'layers'
        for (const layer of layers){
            interpretedLayers.push(
                {
                    data: layer['data'],
                    id: layer['id'],
                    name: layer['name'],
                    type: layer['type']
                }
            )
        }

        // interpret 'tilesets'
        for (const ts of tilesets) {

            // tileset urls go to a diff path, we have to trim the path and make it work. which is for organization purposes.
            const properString = ts['source'].split('tilesets/')
            const properTilesetPath = properString[1]
            const properTileset = await this.Parse('tiled/tilesets/' + properTilesetPath)

            interpretedTilesets.push(
                {
                    firstgid: ts['firstgid'],
                    data: properTileset,
                }
            )
        }
        return {
            class: parsed['class'],
            layers: interpretedLayers,
            tilesets: interpretedTilesets,
        }
    }

    async GetWorld(worldName){
        const world = await this.Parse(this.Path + `worlds/${worldName}/` + worldName + '.world')
        return {
            maps: world['maps'],
        }
    }

    async LoadWorld(worldName = '') {
        if (worldName.length > 0) {
            this.name = worldName
        }
        this.loadedWorld = await this.GetWorld(this.name)

        for (const map of this.loadedWorld['maps']) {
            const pos = new VG.XYZ(map['x'], map['y'])
            this.maps[pos.ToString] = await this.ParseMap(map['fileName'])

            if (this.maps[pos.ToString]['class'] === 0 && (pos.x !== 0 || pos.y !== 0)) {
                this.originPos = pos
            }
        }
    }



    get Path(){
        return 'tiled/'
    }

    async GetJSONFileAsStr(filePath) {
        const loadRq = new Request(VG.directory+filePath)
        const re = await fetch(loadRq)
        if (!re.ok) {
            console.log(re.text(), 'Parse: INVALID!!! -', filePath)
            return ''
        } else {
            const retStr = await re.text()
            console.log('Parse: okay ❤️ yay ❤️ -', filePath)
            return retStr
        }
    }

    async Parse(fileName) {
        if (this.cachedParses[fileName] === undefined) {
            this.cachedParses[fileName] = JSON.parse(await this.GetJSONFileAsStr(fileName))
        }
        return this.cachedParses[fileName]
    }






















    // this.lvl
    async LoadLvl() {
        return JSON.parse(await this.GetJSONFileAsStr('tiled/' + this.name));
    }

    // this.tileSets
    async LoadTilesets(){
        const tilesets = []
        for (const ts of this.lvl.tilesets){
            tilesets.push({ fgid: ts.firstgid, src: ts.source, data: '' })
        }
        return tilesets
    }
}