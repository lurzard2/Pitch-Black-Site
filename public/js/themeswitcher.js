import { load, save } from './savedata.js';
import { Data, Themes } from './savedata.js'

const themeSheet = document.getElementById("theme");
let currentTheme = load(Data.Theme);

document.getElementById("themeswitcher").innerHTML = '<button id="themebutton"></button>';
const button = document.getElementById("themebutton");

button.onclick = function (){
    if (currentTheme === Themes.Dark){ save(Data.Theme, Themes.Light) }
    if (currentTheme === Themes.Light){ save(Data.Theme, Themes.Dark) }
    settheme();
}

settheme();
function settheme(){
    if (currentTheme === Themes.Dark) {
        themeSheet.href = "css/themes/dark.css";
    }
    else if (currentTheme === Themes.Light) {
        themeSheet.href = "css/themes/light.css";
    }
}