export const _ = {
    DisplayName: "displayname",
    DisplayTheme: "displaytheme",
    KotClicker: "kotclicker",
}

export const Themes = {
    Dark: "dark",
    Light: "light",
}

export const KotClicker = {
    Kot: {
        State: false,
        Power: 100,
    },
    RivalKot: {
     Clicks: 0,
    },

    // total: every click ever on kot
    // burst: tracked clicks for scripts, resets when you stop clicking
    // (_kot name): clicks per-kot. If key exists, count as discovered for Kollection
    Clicks: {
        Total: 0,
        MeiMei: 0,
        Goated: 0,
        Burst: 0,
    },
}

//init
if (!Exists(_.DisplayName)){
    Save(_.DisplayName, "Undefined");
}
if (!Exists(_.KotClicker)){
    Save(_.KotClicker, KotClicker);
}
if (!Exists(_.DisplayTheme)){
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    Save(_.DisplayTheme, isDarkMode ? 'dark' : 'light');
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

export function Chance(perc){
    return Math.random() < (perc / 100);
}

export function RandomRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const userName = document.querySelectorAll(".user");
if (userName !== null){
    userName.forEach((user) => {
        user.innerHTML = Load(_.DisplayName);
        user.onclick = function(){
            Save(_.DisplayName, Prompt("You are requesting to change your display name to:", Load(_.DisplayName)));
            if (Load(_.DisplayName) === null || Load(_.DisplayName) === "null" || Load(_.DisplayName) === "" || Load(_.DisplayName).length > 20){
                Save(_.DisplayName, "You");
            }
            user.innerHTML = Load(_.DisplayName);
        }
    })
}
function Prompt(msg, def){
    return window.prompt(msg, def)
    //TODO:Better dialogue box later
}