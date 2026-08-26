import { load, save } from './savedata.js';
import { Data, Themes } from './savedata.js'
import { increment } from './kotclicker.js';

const themeSheet = document.getElementById("theme");
let currentTheme = "";

document.getElementById("themeswitcher").innerHTML = '<button id="themebutton"></button>';
export const button = document.getElementById("themebutton");

button.onclick = function (){
    currentTheme = load(Data.Theme);
    if (currentTheme === Themes.Dark){ save(Data.Theme, Themes.Light) }
    if (currentTheme === Themes.Light){ save(Data.Theme, Themes.Dark) }
    increment();
    settheme();
}

settheme();
function settheme(){
    currentTheme = load(Data.Theme);
    if (currentTheme === Themes.Dark) {
        themeSheet.href = "css/themes/dark.css";
        button.className = 'dark';
    }
    else if (currentTheme === Themes.Light) {
        themeSheet.href = "css/themes/light.css";
        button.className = 'light';
    }
}