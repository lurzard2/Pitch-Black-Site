import { Load } from './main.js';
import { _, Themes } from './main.js';

setHeader();
window.addEventListener('resize', function() { setHeader(); });
function setHeader() {
    let currentTheme = Load(_.DisplayTheme);

    document.getElementById("side").innerHTML = '<div id="headerbg"></div>';
    document.getElementById("headerbg").innerHTML = '<div class="titlebh"><a href="home.html"></a></div>';
    if (currentTheme === Themes.Light) {
        document.querySelector('.titlebh').className = 'titlewv';
    }
}