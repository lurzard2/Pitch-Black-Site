import {_, Load, Save, Chance, RandomRange} from './main.js';

const __ = Load(_.KotClicker);
function _Save() { Save(_.KotClicker, __); }

const filePath = "../images/kotclicker/"

const counter = document.querySelectorAll(".kot-count");

const Stats = {
    TotalClicks: "total",
    PersistentMeiMeis: "meimei",
    GlobalGoateds: "Goated"
}

function UpdateStat(stat, amount = 1){
    if (stat === Stats.TotalClicks){
        if (amount > 0 || amount < 0) __.Clicks.Total += amount;
        counter.forEach((el) => {
            el.innerHTML = __.Clicks.Total;
        });
    }
    if (stat === Stats.PersistentMeiMeis){
        if (amount > 0 || amount < 0) __.Clicks.MeiMei++;
        document.querySelectorAll(".kot-meimei").forEach(count=> {count.innerHTML = __.Clicks.MeiMei})
    }

    if (stat === Stats.GlobalGoateds){
        if (amount > 0 || amount < 0) __.Clicks.Goated++;
        document.querySelectorAll(".kot-goated").forEach(count=> {count.innerHTML = __.Clicks.Goated});
    }
}

// on site load, load and print the count saved
UpdateStat(Stats.TotalClicks, 0);
UpdateStat(Stats.PersistentMeiMeis, 0);
UpdateStat(Stats.GlobalGoateds, 0);

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
        UpdateStat(Stats.TotalClicks, 1);
        kot.className = __.Kot.State ? "light" : "dark";
    }
}

const kontainer = document.getElementById("kot-spawns");

const spawnedKots = [];

function RemoveKot(instance, id){
    kontainer.removeChild(document.getElementById(id));
    spawnedKots.splice(spawnedKots.indexOf(instance), 1);
}

// Template for creating kots
class SpawnableKot {

    Click(){
        this.Despawning();
    }

    constructor(spawnAsset, asset, timeToSpawn = 200, timeToLive = 300){
        this.spawnAsset = spawnAsset;
        this.asset = asset;
        this.stage = 0;
        this.addedClickFunction = false;
        this.time_Spawn = timeToSpawn;
        this.time_Life = timeToLive;
        this._kot = document.createElement('div');
        this._kot.className = "kot";
        this._kot.style.top = Math.floor(Math.random() * ((window.innerHeight - 160) - this._kot.offsetHeight)) + "px";
        this._kot.style.left = Math.floor(Math.random() * ((window.innerWidth - 160) - this._kot.offsetWidth)) + "px";
        this._kot.id = "kot" + spawnedKots.indexOf(this);
    }

    Spawning() {
        this._kot.style.backgroundImage = "url('" + this.spawnAsset + "')";
        kontainer.appendChild(this._kot);
    }
    Life() {
        if (this.stage === 0){
            this._kot.style.backgroundImage = "url('" + this.asset + "')";
            this._kot.style.backgroundSize = "cover";
            this.stage++;
        }
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
    Despawning() {
        RemoveKot(this, this._kot.id);
    }
}

class Evil extends SpawnableKot {
    constructor(){
        super(
            filePath + "evil-spawner.gif",
            filePath + "kots/EVILkot.gif",
            150,
            350);
        this.asset2 = filePath + "kots/EVILkot2.gif";
    }

    Click(){
        if (this.stage === 1){
            this.Despawning();
        }
    }

    Life() {
        super.Life();
        if (this.time_Life < 110 && this.stage === 1) {
            this._kot.style.backgroundImage = "url('" + this.asset2 + "')";
            this.stage++;
        }
    }

    Despawning() {
        if (this.stage === 2){
            UpdateStat(Stats.TotalClicks, -10);
        }
        super.Despawning();
    }
}

class Lucky extends SpawnableKot {
    constructor(){
        super(
            filePath + "lucky-spawner.gif",
            filePath + "kots/joykot.gif",
            300,
            600
        )
    }

    Click(){
        if (this.stage === 1){
            this.Despawning();
        }
    }
    Despawning() {
        UpdateStat(Stats.TotalClicks, 777);
        super.Despawning();
    }
}

class Melon extends SpawnableKot {
    constructor() {
        super(
            filePath + "melon-spawner.gif",
            filePath + "kots/kotDEATH.png",
        )
        this.asset2 = filePath + "kots/kotDEATH.gif";
    }

    Click(){
        if (this.stage === 1){
            this._kot.style.backgroundImage = "url('" + this.asset2 + "')";
            this.time_Life = 100;
            UpdateStat(Stats.TotalClicks, RandomRange(100, 200));
            this.stage++;
        }
    }

    Despawning() {
        if (this.stage === 2){
            super.Despawning();
        }
    }
}

class MeiMei extends SpawnableKot {
    constructor(){
        super(
            filePath + "meimei-spawner.gif",
            filePath + "kots/meimei/" + RandomRange(0, 8) + ".gif",
            600,
            300
        )
    }

    Click(){
        UpdateStat(Stats.PersistentMeiMeis);
        super.Despawning();
    }
}

class ClickerRival extends SpawnableKot {
    constructor(){
        super(
            filePath + "clicker-spawner.gif",
            filePath + "kots/kot.gif",
            1000,
        )
    }

    Despawning() {
        __.RivalKot.Clicks++;
        super.Despawning();
    }
}

// global update
function KotClickerUpdate(){

    if (Chance(1)){
        spawnedKots.push(new Evil);
    }
    if (Chance(0.01)){
        spawnedKots.push(new Lucky);
    }
    if (Chance(0.15)){
        spawnedKots.push(new Melon);
    }
    if (Chance(0.003)){
        spawnedKots.push(new MeiMei);
    }
    if (Chance(0.0008)){
        spawnedKots.push(new ClickerRival);
    }

    // mandatory for allowing every kot to exist simultaneously
    spawnedKots.forEach(kot => {
        kot.Update();
        kot._kot.onclick = function () { kot.Click() }
        //console.log(kot);
    })
}

requestAnimationFrame(UPDATE);
function UPDATE(){

    KotClickerUpdate();
    //_Save();

    requestAnimationFrame(UPDATE);
}