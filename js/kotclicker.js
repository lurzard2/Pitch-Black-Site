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
        if (Chance(0.0001)){
            Send("Calm down.");
        }
        UpdateStat(Stats.TotalClicks, 1);
        kot.className = __.Kot.State ? "light" : "dark";
    }
}

const chat = document.getElementById("kot-chat");
const chatLog = [];
class Msg{
    constructor(text, color = "white") {
        this.text = text;
        this._msg = document.createElement('p');
        this._msg.innerHTML = text;
        this._msg.id = "msg" + chatLog.indexOf(this);
        this._msg.style.color = color;
        chat.appendChild(this._msg);
        this.visibilityTime = this.text.length * 100;
        this.opacity = 1;
        this._msg.style.width = this.visibilityTime;
    }

    Update(){
        if (this.visibilityTime > 0){
            this.visibilityTime--;
        } else if (this.opacity > 0) {
            this.opacity -= 0.005;
            this._msg.style.opacity = this.opacity;
        } else {
            chat.removeChild(document.getElementById(this._msg.id));
            chatLog.splice(chatLog.indexOf(this), 1);
        }
    }
}
function Send(msg, color = "white"){
    chatLog.push(new Msg(msg, color));
}

const kontainer = document.getElementById("kot-spawns");

const spawnedKots = [];

function RemoveKot(instance, id){
    if (instance === null || id === null){
        return;
    }
    kontainer.removeChild(document.getElementById(id));
    spawnedKots.splice(spawnedKots.indexOf(instance), 1);
}

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
            Send("Evil Kot took out their anger on you.")
            UpdateStat(Stats.TotalClicks, -RandomRange(1, 50));
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
        Send("WAOW WAOW!!")
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
            if (Chance(0.00076)){
                Send("Thank you.")
            }
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
        if (this.stage === 1){
            Send("Bagged a MeiMei")
            UpdateStat(Stats.PersistentMeiMeis);
            super.Despawning();
        }
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

    Click(){
        if (this.stage === 1){
            super.Despawning();
        }
    }

    Despawning() {
        __.RivalKot.Clicks++;
        Send("Your rival clicked you...")
        super.Despawning();
    }
}
class AntiClicker extends SpawnableKot {
    constructor(){
        super(
            filePath + "anticlicker-spawner.gif",
            filePath + "kots/kotanticlicker.gif",
            1500,
            1500
        )
    }

    Life(){
        UpdateStat(Stats.TotalClicks, -RandomRange(1, 50));
        if (Chance(20)){
            Send("It's the Anti Clicker! HURRY HURRY HURRY!!!")
        }
        super.Life();
    }

    Click(){
        if (this.stage === 1){
            super.Despawning();
        }
    }
}
class Follower extends SpawnableKot {
    constructor() {
        super(
            filePath + "follower-spawner.gif",
            filePath + "kots/",
            500,
            500
        );
        this.matchedState = Chance(50);
        this.asset += this.matchedState ? "kecalp.gif" : "placek.png";
    }

    Click(){
        if (this.matchedState === __.Kot.State){
            UpdateStat(Stats.TotalClicks, RandomRange(1, 300));
            Send("You played along and were rewarded handsomely.")
        } else {
            UpdateStat(Stats.TotalClicks, -RandomRange(1, 300));
            Send("You fool...")
        }
        super.Despawning();
    }
}
class Deceiver extends SpawnableKot {
    constructor(){
        super(
            filePath + "deceiver-spawner.gif",
            filePath + "kots/greykot.png",
            400,
        );
    }

    Click(){
        if (this.stage === 1){
            if (Chance(50)){
                // copy Evil
                UpdateStat(Stats.TotalClicks, -RandomRange(1, 50));
                Send("This one was EVIL.")
            } else {
                // copy Lucky
                UpdateStat(Stats.TotalClicks, 777);
                Send("This one was LUCKY!")
            }

            super.Despawning();
        }
    }
}

function Spawn(){
    let k = null;
    function DynamicChance(perc){
        //console.log(perc * __.Clicks.Total);
        return Chance(perc) * __.Clicks.Total;
    }

    if (DynamicChance(30)){
        k = new Evil();
    }
    if (DynamicChance(30)){
        k = new Melon();
    }
    if (Chance(1.777)){
        k = new Lucky();
    }
    if (Chance(2.5)){
        k = new MeiMei();
    }
    if (Chance(1)){
        k = new Follower();
    }
    if (DynamicChance(1)){
        k = new ClickerRival();
    }
    if (DynamicChance(1)){
        k = new AntiClicker();
    }
    if (DynamicChance(1)){
        k = new Deceiver();
    }

    if (k !== null){
        spawnedKots.push(k);
    }
}

let spawnDelay = 100;
// global update
function KotClickerUpdate(){
    if (spawnDelay <= 0){
        Spawn();
        spawnDelay = 100;
    } else {
        spawnDelay--;
    }

    // mandatory for allowing every kot to exist simultaneously
    spawnedKots.forEach(kot => {
        kot.Update();
        kot._kot.onclick = function () { kot.Click() }
        //console.log(kot);
    })

    chatLog.forEach(msg => {
        msg.Update();
    })
}

if (Load("kotclickerclicks") !== null){
    localStorage.clear();
    _Save();
}

requestAnimationFrame(UPDATE);
function UPDATE(){

    KotClickerUpdate();
    //_Save(); // wait til release

    requestAnimationFrame(UPDATE);
}