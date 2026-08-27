import {LoadRaw, SaveRaw, Load, Save } from './savedata.js';
import { Data, Themes } from './savedata.js'

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
        currentTheme = Load(Data.Theme);

        if (Chance(1 || counter.innerHTML === "420")){
            Save(Data.Theme, Themes.Green);
        }
        else if (Chance(0.5)){
            Save(Data.Theme, Themes.Red);
        }
        else if (currentTheme !== Themes.Dark){ Save(Data.Theme, Themes.Dark); }
        else{
            Save(Data.Theme, Themes.Light);
        }

            //if (currentTheme === Themes.Dark){ Save(Data.Theme, Themes.Light) }
            //if (currentTheme === Themes.Light){ Save(Data.Theme, Themes.Dark) }
            //else{Save(Data.Theme, Themes.Dark);}
        IncrementCounter();
        SetTheme();
    }
}

SetTheme();
function SetTheme(){
    currentTheme = Load(Data.Theme);
    const name = document.getElementById("kot-name");
    let kotname = "Kot";
    if (kot !== null){
        kot.className = currentTheme;
    }
    if (currentTheme === Themes.Dark) {
        themeSheet.href = "css/themes/dark.css";
    }
    if (currentTheme === Themes.Light) {
        themeSheet.href = "css/themes/light.css";
    }
    if (currentTheme === Themes.Green) {
        kotname = "Kot yauy";
    }
    if (currentTheme === Themes.Red) {
        kotname = "Kot EVIL";
    }
    if (name !== null){
        name.innerHTML = kotname;
    }
}