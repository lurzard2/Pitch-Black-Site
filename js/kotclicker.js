import {Keys, Load, Save, Kots} from './main.js';

function Chance(perc){
    return Math.random() < (perc / 100);
}

// on site load, load and print the count saved
const counter = document.getElementById("kot-counter");
if (counter !== null) {
    counter.innerHTML = Load(Keys.KotClickerCounter) || 0;
}

// used for kot clicker, on click increment the counter
export function IncrementCounter(){
    let count = parseInt(Load(Keys.KotClickerCounter)) || 0;
    count += 1;
    if (Number.isNaN(count)){ count = 0; }
    counter.innerHTML = count;
    Save(Keys.KotClickerCounter, count);
}

// add button to div
const kotContainer = document.getElementById("kotholder");
if (kotContainer !== null){
    kotContainer.innerHTML = '<button id="kotbutton"></button>';
}

// get button to add click event
const kot = document.getElementById("kotbutton");
if (kot !== null){
    kot.onclick = function (){
        let count = parseInt(Load(Keys.KotClickerCounter)) || 0;

        if (count === 9999){
            Save(Keys.Kot, Kots.Gerardtrax);
        }
        else if (Chance(1) || count === 419) {
            Save(Keys.Kot, Kots.Green);
        }
        else if (Chance(1)){
            Save(Keys.Kot, Kots.Red);
        }
        else if (Chance(1)){
            Save(Keys.Kot, Kots.Alicja);
        }
        else if (Chance(1)){
            Save(Keys.Kot, Kots.Tata);
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
            Save(Keys.Kot, realKot);
        }

        else if (Load(Keys.Kot) !== Kots.Dark){ Save(Keys.Kot, Kots.Dark); }
        else{
            Save(Keys.Kot, Kots.Light);
        }

        IncrementCounter();
        SetKot();
    }
}

SetKot();
function SetKot(){
    let currentKot = Load(Keys.Kot);
    const kotname = document.getElementById("kot-name");
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