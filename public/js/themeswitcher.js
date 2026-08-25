import { load, save, exists } from './savedata.js';
import { theme } from './savedata.js'

const themeSheet = document.getElementById("theme");

const Th_dark = "dark";
const Th_light = "light";

let currentTheme = "current";

addThemeSwitcherToPage();
window.addEventListener('resize', function() { addThemeSwitcherToPage(); });
function addThemeSwitcherToPage(){
    if (!exists(theme)) {
        save(theme, Th_dark);
    }

    currentTheme = load(theme);

    if (currentTheme === Th_dark) {
        themeSheet.href = "css/themes/dark.css";
    }
    else if (currentTheme === Th_light) {
        themeSheet.href = "css/themes/light.css";
    }
}