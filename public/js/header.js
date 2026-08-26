import { load } from './savedata.js';
import { Data, Themes } from './savedata.js'

setHeader();
window.addEventListener('resize', function() { setHeader(); });
function setHeader() {
    let currentTheme = load(Data.Theme);

    let desktop = window.innerWidth > 767;

    document.getElementById("side").innerHTML = '<div id="headerbg"></div>';

    if (desktop) {
        document.getElementById("headerbg").innerHTML = '<div class="titlebv"><a href="home.html"></a></div>';

        if (currentTheme === Themes.Light) {
            document.querySelector('.titlebv').className = 'titlewv';
        }

    } else {
        document.getElementById("headerbg").innerHTML = '<div class="titlebh"><a href="home.html"></a></div>';

        if (currentTheme === Themes.Light) {
            document.querySelector('.titlebv').className = 'titlewh';
        }
    }
}