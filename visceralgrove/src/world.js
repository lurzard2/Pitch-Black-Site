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
        const parsed = await this.ParseJSON(this.Path + `worlds/${this.name}/` + mapString)

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
            const properTileset = await this.ParseJSON('tiled/tilesets/' + properTilesetPath)

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
        const world = await this.ParseJSON(this.Path + `worlds/${worldName}/` + worldName + '.world')
        // We don't actually need any other data besides the maps array
        return {
            maps: world['maps'],
        }
    }

    async LoadWorld(worldName = '') {
        // Dynamic world switching?
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

    async GetFileAsStr(filePath) {
        const loadRq = new Request(VG.directory+filePath)
        const re = await fetch(loadRq)
        if (!re.ok) {
            console.log(re.text(), 'GetFileAsStr: INVALID!!! -', filePath)
            return ''
        } else {
            const retStr = await re.text()
            console.log('GetFileAsStr: okay ❤️ yay ❤️ -', filePath)
            return retStr
        }
    }

    async ParseJSON(fileName) {
        if (this.cachedParses[fileName] === undefined) {
            this.cachedParses[fileName] = JSON.parse(await this.GetFileAsStr(fileName))
        }
        return this.cachedParses[fileName]
    }






















    // this.lvl
    async LoadLvl() {
        return JSON.parse(await this.GetFileAsStr('tiled/' + this.name));
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