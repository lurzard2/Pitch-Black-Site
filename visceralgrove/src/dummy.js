export class Asset {
    constructor(assetName, ext) {
        this.assetName = assetName;
        this.ext = ext;
    }

    // prefix and/or suffix injection
    ExtName({pf = '', sf = ''}) {
        return directory+'assets/'+ pf+this.assetName+sf +'.'+this.ext;
    }

    get GetName() {
        return this.ExtName({});
    }
}

export class VGImage extends Asset {
    constructor(textureName = 'PH', ext = 'png') {
        super(textureName, ext);
    }

    #Load(img, x, y) {
        VG.container.drawImage(img, x, y, TILE, TILE);
    }

    Render(pos) {
        const i = new Image();

        i.onload = () => {
            this.#Load(i, pos.x, pos.y);
        }

        i.onerror = (e) => {
            console.log(e, '\n'+i);
        }

        i.src = this.GetName
    }
}



export class Tile {
    constructor(asset = new VGImage(), pos = new XYZ()) {
        this.asset = asset;
        this.pos = pos;
    }

    Render() {
        this.asset.Render(this.pos.Normalized)
    }
}
