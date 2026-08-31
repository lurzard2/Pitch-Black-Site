import {_, Load, Save, Chance} from './main.js';

const __ = Load(_.KotClicker);
function _Save() { Save(_.KotClicker, __); }

// on site load, load and print the count saved
const counter = document.querySelectorAll(".kot-count");
if (counter !== null) {
    counter.forEach((el) => {
        el.innerHTML = __.Clicks.Total;
    })
}

// used for kot clicker, on click increment the counter
export function IncrementCounter(){
    __.Clicks.Total += 1;
    counter.forEach((el) => {
        el.innerHTML = __.Clicks.Total;
    })
}

// add button to div
const kotContainer = document.getElementById("kot-holder");
if (kotContainer !== null){
    kotContainer.innerHTML = '<div id="kot-button"></div>';
}

// name element
const kotname = document.getElementById("kot-name");
// button element
const kot = document.getElementById("kot-button");
if (kot !== null){
    kot.className = __.Kot.State ? "light" : "dark";
    kot.onclick = function (){
        __.Kot.State = !__.Kot.State;
        IncrementCounter();
        kot.className = __.Kot.State ? "light" : "dark";
        _Save();
    }
}

const kontainer = document.getElementById("kot-spawns");

const spawnedKots = [];

function RemoveKot(instance, id){
    spawnedKots.splice(spawnedKots.indexOf(instance), 1);
    kontainer.removeChild(document.getElementById(id));
}

// Template for creating kots
class SpawnableKot {

    Click(){
        this.Despawning();
    }

    constructor(spawnAsset, asset, timeToSpawn = 200, timeToLive = 300){
        this.spawnAsset = spawnAsset;
        this.asset = asset;
        this.assetChanges = 0;
        this.addedClickFunction = false;
        this.time_Spawn = timeToSpawn;
        this.time_Life = timeToLive;
        this._kot = document.createElement('div');
        this._kot.className = "kot";
        this._kot.id = "kot" + spawnedKots.indexOf(this);
    }

    Spawning() {

    }
    Life() {

    }
    Despawning() {
        RemoveKot(this, this._kot.id);
    }
    Update() {
        this._kot.id = "kot" + spawnedKots.indexOf(this);

        if (this.time_Life === 0){
            this.Despawning();
        } else if (this.time_Spawn > 0){
            this.Spawning();
            this.time_Spawn -= 1;
        } else if (this.time_Life > 0) {
            this.Life();
            this.time_Life -= 1;
        }
    }
}


class EvilKot extends SpawnableKot {
    constructor(){
        super(
            "../images/kotclicker/evil-spawner.gif",
            "../images/kotclicker/kots/EVILkot.gif");
        this.asset2 = "../images/kotclicker/kots/EVILkot2.gif";
    }

    Spawning() {
        this._kot.style.backgroundImage = "url('" + this.spawnAsset + "')";
        kontainer.appendChild(this._kot);
    }

    Life(){
        if (this.assetChanges === 0){
            this._kot.style.backgroundImage = "url('" + this.asset + "')";
            this._kot.style.backgroundSize = "cover";
            this.assetChanges++;
        }
        if (this.time_Life < 110 && this.assetChanges === 1){
            this._kot.style.backgroundImage = "url('" + this.asset2 + "')";
            this.assetChanges++;
        }
    }

    Despawning() {
        __.Clicks.Total -= 500;
        super.Despawning();
    }
}



spawnedKots.push(new EvilKot());

// global update
function KotClickerUpdate(){

    //TODO: <spawning logic>

    // mandatory for allowing every kot to exist simultaneously
    spawnedKots.forEach(kot => {
        kot.Update();
        //console.log(kot);
    })
}

requestAnimationFrame(UPDATE);
function UPDATE(){
    //console.log("hi");

    KotClickerUpdate();

    requestAnimationFrame(UPDATE);
}