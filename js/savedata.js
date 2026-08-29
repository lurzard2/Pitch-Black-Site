export const Keys = {
    KotClicker: "kotclicker",
    KotClickerCounter: "kotclickercounter",
    Kot: "kot",
}

export const KotClicker = {
    // Kot to display
    Current: "kot",

    // total: every click ever on kot
    // burst: tracked clicks for scripts, resets when you stop clicking
    // (kot name): clicks per-kot. If key exists, count as discovered for Kollection
    Clicks: {
        _total: 0,
        _burst: 0,
    },

    Buffs: {},
    Debuffs: {},
    Skills: {},
    Achievements: {},
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
export function SaveRaw(key, value){ localStorage.setItem(key, value); }

export function Load(key){
    if (!Exists(key)){
        // default assignments
        let val = "na";
        if (key === Keys.Theme) { val = "dark"; }
        if (key === Keys.Username) { val = "you"; }
        if (key === Keys.Deadname) { val = "Gabriele"; }
        if (key === Keys.Name) { val = "Alex"; }
        Save(key, val);
    }
    return JSON.parse(localStorage.getItem(key));
}
export function LoadRaw(key, value){ return localStorage.getItem(key); }

export function Exists(key){
    return localStorage.getItem(key) !== null;
}