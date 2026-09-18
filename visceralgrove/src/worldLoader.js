import {directory, XYZ, LoopThroughGrid} from '../game.js'

// Hold level data
export class WorldLoader {
    constructor(name) {
        this.name = name;
        this.originPos = new XYZ()
        this.loadedWorld = {}
        this.maps = []
        this._cachedParses = {}
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
            if (layer.type === 'tilelayer') {
                interpretedLayers.push(
                    {
                        data: layer['data'],
                        id: layer['id'],
                        name: layer['name'],
                        type: layer['type']
                    }
                )
            }
            if (layer.type === 'objectgroup') {
                interpretedLayers.push(
                    {
                        id: layer['id'],
                        name: layer['name'],
                        type: layer['type'],
                        objects: layer['objects'],
                    }
                )
            }
        }

        // interpret 'tilesets' but it's deeply nested stuff
        for (const ts of tilesets) {
            // tileset urls go to a diff path, we have to trim the path and make it work. which is for organization purposes.
            const properString = ts['source'].split('tilesets/')
            const properTilesetPath = properString[1]
            const properTileset = await this.ParseJSON('tiled/tilesets/' + properTilesetPath)
            // now we filter!
            const properTSObj = {
                firstgid: ts['firstgid'],
                name: properTileset['name'],
                image: properTileset['image'],
                size: new XYZ(properTileset['imageheight'], properTileset['imagewidth']),
                count: properTileset['tilecount'],
            }

            interpretedTilesets.push(properTSObj)
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
            const pos = new XYZ(map['x'], map['y'])
            this.maps[pos.ToString] = await this.ParseMap(map['fileName'])

            if (this.maps[pos.ToString]['class'] === '0' && (pos.x !== 0 || pos.y !== 0)) {
                this.originPos = pos
            }
        }
    }



    get Path(){
        return 'tiled/'
    }

    //TODO: refactor to use pixi?
    async GetFileAsStr(filePath) {
        const loadRq = new Request(directory+filePath)
        const re = await fetch(loadRq)
        if (!re.ok) {
            console.warn(re.text(), 'GetFileAsStr: INVALID!!! -', filePath)
            return ''
        } else {
            const retStr = await re.text()
            console.debug('GetFileAsStr: okay ❤️ yay ❤️ -', filePath)
            return retStr
        }
    }

    async ParseJSON(fileName) {
        if (this._cachedParses[fileName] === undefined) {
            this._cachedParses[fileName] = JSON.parse(await this.GetFileAsStr(fileName))
        }
        return this._cachedParses[fileName]
    }
}