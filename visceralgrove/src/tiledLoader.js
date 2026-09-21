export const MapLayerType = {
    TILE: 'tilelayer',
    OBJECT: 'objectgroup',
    GROUP: 'group'
}



import {pixiDirectory, XYZ, SCREEN, directory} from '../game.js'
import { Assets } from '/js/pixi.mjs'

export class TiledLoader {
    constructor(worldName) {
        this.path = pixiDirectory + 'tiled/'
        this.worldName = worldName
    }

    get GetWorldPath() {
        return this.path + `worlds/${this.worldName}/`
    }

    async ParseWorld() {
        const path = this.GetWorldPath + this.worldName + '.world'

        const loadRq = new Request(path)
        const re = await fetch(loadRq)
        if (!re.ok) {
            console.warn(re.text(), 'INVALID!!! -', path)
            return {}
        } else {
            console.debug('okay ❤️ yay ❤️ -', path)
            return JSON.parse(await re.text())
        }
    }

    async GetWorld() {
        // pixi won't parse .world files, it's just json though
        const world = await this.ParseWorld()

        const parsedMaps = []
        let originPos = new XYZ()

        for (const map of world['maps']) {

            // 1-incremental pos
            const pos = new XYZ(map['x'] / SCREEN.x, map['y'] / SCREEN.y)

            const parsedMap = await this.ParseMap(map['fileName'])

            if (parsedMap['class'] === '0'
                && (pos.x !== 0 || pos.y !== 0))
            {
                originPos = pos
            }

            parsedMaps[pos.ToString] = {
                pos: pos,
                map: parsedMap
            }
        }

        return {
            maps: parsedMaps,
            originPos: originPos
        }
    }

    async ParseMap(url) {
        const map = await Assets.load(this.GetWorldPath + url)

        const parsedTilesets = []
        for (const ts of map.tilesets) {
            const parsedTS = await this.ParseTileset(ts['source'])
            // carry over firstgid from map file
            parsedTS['firstgid'] = ts['firstgid']
            parsedTilesets.push(parsedTS)
        }

        return {
            class: map.class,
            layers: map.layers,
            tilesets: parsedTilesets
        }
    }

    async ParseTileset(url) {
        // We need to do quite a bit to get this to work out properly since the folder structure creates unusable file paths in maps without trimming

        // gets specifically the file name without the file path behind it
        const TSName = url.split('tilesets')[1]

        // gets rid of the ../../../ etc
        const TSPath = 'tilesets/' + TSName

        const tileset = await Assets.load(this.path + TSPath)

        // load image here from same file path,
        // subtracting the json name part, and this.using the image file instead
        await Assets.load({alias: tileset['name'], src: this.path + TSPath.split(TSName)[0] + tileset.image})

        return tileset
    }
}