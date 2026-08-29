if (count === 9999){
    Save(_.Kot, Kots.Gerardtrax);
}
else if (Chance(1) || count === 419) {
    Save(_.Kot, Kots.Green);
}
else if (Chance(1)){
    Save(_.Kot, Kots.Red);
}
else if (Chance(1)){
    Save(_.Kot, Kots.Alicja);
}
else if (Chance(1)){
    Save(_.Kot, Kots.Tata);
}
else if (Chance(1)){
    let realKot = Kots.Mooyling;
    if (Chance(1)){
        realKot = Kots.Magic;
    }
    if (Chance(1)){
        realKot = Kots.Mexico;
    }
    if (Chance(1)){
        realKot = Kots.Dakras;
    }
    if (Chance(1)){
        realKot = Kots.Tetra;
    }
    if (Chance(1)){
        realKot = Kots.Tronsx;
    }
    if (Chance(1)){
        realKot = Kots.Detrax;
    }
    if (Chance(1)){
        realKot = Kots.Accordion;
    }
    if (Chance(1)){
        realKot = Kots.AH;
    }
    if (Chance(1)){
        realKot = Kots.Augh;
    }
    if (Chance(1)){
        realKot = Kots.Baby;
    }
    if (Chance(1)){
        realKot = Kots.Death;
    }
    if (Chance(1)){
        realKot = Kots.Ew;
    }
    if (Chance(1)){
        realKot = Kots.Faucetling;
    }
    if (Chance(1)){
        realKot = Kots.Fear;
    }
    if (Chance(1)){
        realKot = Kots.Gulp;
    }
    if (Chance(1)){
        realKot = Kots.Idiot;
    }
    if (Chance(1)){
        realKot = Kots.Jumpscare;
    }
    if (Chance(1)){
        realKot = Kots.Looker;
    }
    if (Chance(1)){
        realKot = Kots.Missile;
    }
    if (Chance(1)){
        realKot = Kots.Party;
    }
    if (Chance(1)){
        realKot = Kots.Pat;
    }
    if (Chance(1)){
        realKot = Kots.Peak;
    }
    if (Chance(1)){
        realKot = Kots.ResonanceCascade;
    }
    if (Chance(1)){
        realKot = Kots.Tiny;
    }
    if (Chance(1)){
        realKot = Kots.Woowoo;
    }
    if (Chance(1)){
        realKot = Kots.Placek;
    }
    if (Chance(1)){
        realKot = Kots.Kecalp;
    }
    Save(_.Kot, realKot);
}

else if (Load(_.Kot) !== Kots.Dark){ Save(_.Kot, Kots.Dark); }
else{
    Save(_.Kot, Kots.Light);
}

SetKot();
function SetKot(){
    let currentKot = Load(_.Kot);
    let name = "Kot";
    kot.className = currentKot;
    if (currentKot === Kots.Dark || currentKot === Kots.Light) {
        if (document.getElementById('k-visibility').checked) {
            kot.className = "grey";
        }
    }

    if (currentKot === Kots.Green) {
        name = "Kot yauy";
    }
    if (currentKot === Kots.Red) {
        name = "Kot EVIL";
    }
    if (currentKot === Kots.Alicja) {
        name = "Kot Alicja";
    }
    if (currentKot === Kots.Tata) {
        name = "Kot Tata";
    }
    if (currentKot === Kots.Mooyling) {
        name = "Kot Mooyling";
    }
    if (currentKot === Kots.Magic) {
        name = "Kot Magician";
    }
    if (currentKot === Kots.Mexico) {
        name = "Kot Mexico";
    }
    if (currentKot === Kots.Dakras) {
        name = "Kot Dakras";
    }
    if (currentKot === Kots.Tetra) {
        name = "Kot Tetra";
    }
    if (currentKot === Kots.Tronsx){
        name = "Kot Tronsx";
    }
    if (currentKot === Kots.Detrax){
        name = "Kot Detrax";
    }
    if (currentKot === Kots.Kecalp){
        name = "Kecalp";
    }
    if (currentKot === Kots.Placek){
        name = "Placek";
    }
    if (currentKot === Kots.Accordion){
        name = "Kot Accordion";
    }
    if (currentKot === Kots.AH){
        name = "Kot AH";
    }
    if (currentKot === Kots.Augh){
        name = "Kot Auughhhh";
    }
    if (currentKot === Kots.Baby){
        name = "Kot Baby";
    }
    if (currentKot === Kots.Death){
        name = "Kot Death";
    }
    if (currentKot === Kots.Ew){
        name = "Kot Ewwww";
    }
    if (currentKot === Kots.Faucetling){
        name = "Kot Faucetling";
    }
    if (currentKot === Kots.Fear){
        name = "Kot Fear";
    }
    if (currentKot === Kots.Freak){
        name = "Kot Freak";
    }
    if (currentKot === Kots.Gerardtrax){
        name = "Kot Gerard? Detrax?";
    }
    if (currentKot === Kots.Gulp){
        name = "Kot Gulp";
    }
    if (currentKot === Kots.Idiot){
        name = "Kot Idiot";
    }
    if (currentKot === Kots.Jumpscare){
        name = "Kot Jumpscare!!!";
    }
    if (currentKot === Kots.Looker){
        name = "Kot Looker";
    }
    if (currentKot === Kots.Missile){
        name = "Kot Missile!";
    }
    if (currentKot === Kots.Party){
        name = "Kot Party";
    }
    if (currentKot === Kots.Peak){
        name = "Kot Peak";
    }
    if (currentKot === Kots.Pat){
        name = "Kot Patpatpatpat";
    }
    if (currentKot === Kots.ResonanceCascade){
        name = "Kot Resonance Cascade";
    }
    if (currentKot === Kots.Tiny){
        name = "Kot Tiny";
    }
    if (currentKot === Kots.Woowoo){
        name = "Kot Woowoo";
    }
    if (kotname !== null){
        kotname.innerHTML = name;
    }
}