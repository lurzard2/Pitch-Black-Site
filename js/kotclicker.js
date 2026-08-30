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

// Template for creating kots
class SpawnableKot {
    constructor(spawnAsset, asset, timeToSpawn, timeToLive){
        this.spawnAsset = spawnAsset;
        this.asset = asset;
        this.time_Spawn = timeToSpawn;
        this.time_Life = timeToLive;
    }

    Spawning() {

    }
    Life() {

    }
    Despawn() {

    }
    Update() {
        if (this.time_Life < 0){
            this.Despawn();
        } else if (this.time_Spawn >= 0){
            this.Spawning();
            this.time_Spawn -= 1;
        } else if (this.time_Life >= 0) {
            this.Life();
            this.time_Life -= 1;
        }
    }
}

const spawnedKots = [];










// global update for game loop
requestAnimationFrame(UPDATE);
function UPDATE(){
    //console.log("hi");

    spawnedKots.forEach(kot => {
        kot.Update();
    })

    requestAnimationFrame(UPDATE);
}