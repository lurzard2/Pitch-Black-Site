export const Keys = {
    Displayname: "displayname",
    KotClicker: "kotclicker",
    Kot: "kot",
    KotClickerCounter: "kotclickercounter",
}

export const KotClicker = {
    // Kot to display
    Current: {
        Display: "kot",
        Name: "Kot"
    },

    // total: every click ever on kot
    // burst: tracked clicks for scripts, resets when you stop clicking
    // (_kot name): clicks per-kot. If key exists, count as discovered for Kollection
    Clicks: {
        total: 0,
        burst: 0,
    },
}

//init
if (!Exists(Keys.Displayname)){
    Save(Keys.Displayname, "na");
}
if (!Exists(Keys.KotClicker)){
    Save(Keys.KotClickerCounter, 0);
    Save(Keys.Kot, "dark");
    Save(Keys.KotClicker, KotClicker);
}

export const Kots = {
    Dark: "dark",
    Light: "light",
    Green: "green",
    Red: "red",
    Alicja: "alicja",
    Tata: "tata",
    Mooyling: "mooyling",
    Magic: "magic",
    Mexico: "mexico",
    Dakras: "dakras",
    Tetra: "tetra",
    Tronsx: "tronsx",
    Detrax: "detrax",
    Kecalp: "kecalp",
    Placek: "placek",
    Accordion: "accordion",
    AH: "ah",
    Augh: "augh",
    Baby: "baby",
    Death: "death",
    Ew: "ew",
    Faucetling: "faucetling",
    Fear: "fear",
    Freak: "freak",
    Gerardtrax: "gerardtrax",
    Gulp: "gulp",
    Idiot: "idiot",
    Jumpscare: "jumpscare",
    Looker: "looker",
    Missile: "missile",
    Party: "party",
    Peak: "peak",
    Pat: "pat",
    ResonanceCascade: "resonancecascade",
    Tiny: "tiny",
    Woowoo: "woowoo",
}

export function Save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function Load(key){
    return JSON.parse(localStorage.getItem(key));
}

export function Exists(key){
    return localStorage.getItem(key) !== null;
}