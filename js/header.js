import { Load } from './main.js';
import { _, Themes } from './main.js';

setHeader();
window.addEventListener('resize', function() { setHeader(); });
function setHeader() {
    let currentTheme = Load(_.Theme);

    let desktop = window.innerWidth > 700;

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