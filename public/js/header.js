import { load, exists } from './savedata.js';
import { theme } from './savedata.js'

setHeader();
window.addEventListener('resize', function() { setHeader(); });
function setHeader() {
    let currentTheme = "dark";
    if (exists(theme)) {
        currentTheme = load(theme);
    }

    let desktop = window.innerWidth > 1023;
    if (desktop) {
        document.getElementById("side").innerHTML = '<a href="home.html"><div class="center" style="width: 100%; height: 100%">' +
            '<img class="titlev" height="100%" src="images/runictitle-bv.png">' +
            '</div></a>';

        if (currentTheme === 'light') {
            document.querySelector('.titlev').src = 'images/runictitle-wv.png';
        }

    } else {
        document.getElementById("side").innerHTML = '<a href="home.html"><div class="center" style="width: 100%; margin-top: 15px;">' +
            '<img class="titleh" width="45%" src="images/runictitle-bh.png">' +
            '</div></a>';

        if (currentTheme === 'light') {
            document.querySelector('.titleh').src = 'images/runictitle-wv.png';
        }
    }
}