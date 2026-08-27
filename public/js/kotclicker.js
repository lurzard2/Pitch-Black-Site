import {LoadRaw, SaveRaw, Load, Save } from './savedata.js';
import { Data, Kots } from './savedata.js'

function Chance(perc){
    return Math.random() < (perc / 100);
}

const themeSheet = document.getElementById("theme");
let currentTheme = "";

// on site load, load and print the count saved
const counter = document.getElementById("kot-counter");
if (counter !== null) {
    counter.innerHTML = LoadRaw(Data.KotClickerCounter) || 0;
}

// used for kot clicker, on click increment the counter
export function IncrementCounter(){
    let count = parseInt(LoadRaw(Data.KotClickerCounter)) || 0;
    count += 1;
    if (Number.isNaN(count)){ count = 0; }
    counter.innerHTML = count;
    SaveRaw(Data.KotClickerCounter, count);
}

// add button to div
const kotContainer = document.getElementById("kotholder");
if (kotContainer !== null){
    kotContainer.innerHTML = '<button id="kotbutton"></button>';
}

// get button to add click event
const kot = document.getElementById("kotbutton");
if (kot !== null){
    kot.onclick = function (){
        let count = parseInt(LoadRaw(Data.KotClickerCounter)) || 0;

        if (Chance(1) || count === 419) {
            Save(Data.Kot, Kots.Green);
        }
        else if (Chance(0.5)){
            Save(Data.Kot, Kots.Red);
        }
        else if (Chance(0.25)){
            Save(Data.Kot, Kots.Alicja);
        }
        else if (Chance(0.15)){
            Save(Data.Kot, Kots.Tata);
        }
        else if (Chance(10)){
            let realKot = Kots.Mooyling;
            if (Chance(90)){
                realKot = Kots.Magic;
            }
            if (Chance(80)){
                realKot = Kots.Mexico;
            }
            if (Chance(70)){
                realKot = Kots.Dakras;
            }
            Save(Data.Kot, realKot);
        }
        else if (Load(Data.Kot) !== Kots.Dark){ Save(Data.Kot, Kots.Dark); }
        else{
            Save(Data.Kot, Kots.Light);
        }

            //if (currentTheme === Themes.Dark){ Save(Data.Theme, Themes.Light) }
            //if (currentTheme === Themes.Light){ Save(Data.Theme, Themes.Dark) }
            //else{Save(Data.Theme, Themes.Dark);}
        IncrementCounter();
        SetKot();
    }
}

SetKot();
function SetKot(){
    const currentKot = Load(Data.Kot);
    const kotname = document.getElementById("kot-name");
    let name = "Kot";
    kot.className = currentKot;
    if (currentKot === Kots.Green) {
        name = "Kot yauy";
    }
    if (currentKot === Kots.Red) {
        name = "Kot EVIL";
    }
    if (currentKot === Kots.Alicja) {
        name = "Kot Alicja";
    }
    if (currentKot === Kots.Tata) {
        name = "Kot Tata";
    }
    if (currentKot === Kots.Mooyling) {
        name = "Kot Mooyling";
    }
    if (currentKot === Kots.Magic) {
        name = "Kot Magician";
    }
    if (currentKot === Kots.Mexico) {
        name = "Kot Mexico";
    }
    if (currentKot === Kots.Dakras) {
        name = "Kot Dakras";
    }
    if (kotname !== null){
        kotname.innerHTML = name;
    }
}