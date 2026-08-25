setHeader();
window.addEventListener('resize', function() { setHeader(); });
function setHeader() {
    let desktop = window.innerWidth > 1023;
    if (desktop) {
        document.getElementById("side").innerHTML = '<a href="home.html"><div class="center" style="width: 100%; height: 100%">' +
            '<img height="100%" src="images/runictitle-bv.png"></img>' +
            '</div></a>';
    } else {
        document.getElementById("side").innerHTML = '<a href="home.html"><div class="center" style="width: 100%; margin-top: 15px;">' +
            '<img width="45%" src="images/runictitle-bh.png"></img>' +
            '</div></a>';
    }
}