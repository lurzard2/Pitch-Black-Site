import { load } from './savedata.js';
import { Data, Themes } from './savedata.js'

const themeSheet = document.getElementById("theme");

let currentTheme = "current";

addThemeSwitcherToPage();
window.addEventListener('resize', function() { addThemeSwitcherToPage(); });
function addThemeSwitcherToPage(){
    currentTheme = load(Data.Theme);
    if (currentTheme === Themes.Dark) {
        themeSheet.href = "css/themes/dark.css";
    }
    else if (currentTheme === Themes.Light) {
        themeSheet.href = "css/themes/light.css";
    }
}