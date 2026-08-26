import {loadraw, saveraw, load, save } from './savedata.js';
import { Data, Themes } from './savedata.js'

const counter = document.getElementById("kot-counter");
if (counter !== null) {
    counter.innerHTML = loadraw(Data.KotClickerCounter) || 0;
}

export function increment(){
    let count = parseInt(loadraw(Data.KotClickerCounter)) || 0;
    count += 1;
    document.getElementById("kot-counter").innerHTML = count;
    if (Number.isNaN(count)){ count = 0; }
    saveraw(Data.KotClickerCounter, count);
}

const themeSheet = document.getElementById("theme");
let currentTheme = "";

const switcher = document.getElementById("themeswitcher");
if (switcher !== null){
    switcher.innerHTML = '<button id="themebutton"></button>';
}
export const button = document.getElementById("themebutton");
if (button !== null){
    button.onclick = function (){
        currentTheme = load(Data.Theme);
        if (currentTheme === Themes.Dark){ save(Data.Theme, Themes.Light) }
        if (currentTheme === Themes.Light){ save(Data.Theme, Themes.Dark) }
        increment();
        settheme();
    }
}

settheme();
function settheme(){
    currentTheme = load(Data.Theme);
    if (currentTheme === Themes.Dark) {
        themeSheet.href = "css/themes/dark.css";
        if (button !== null){
            button.className = 'dark';
        }
    }
    else if (currentTheme === Themes.Light) {
        themeSheet.href = "css/themes/light.css";
        if (button !== null){
            button.className = 'light';
        }
    }
}