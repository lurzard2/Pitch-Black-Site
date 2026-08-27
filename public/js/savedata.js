export const Data = {
    Theme: "theme",
    Username: "username",
    Deadname: "deadname",
    Name: "name",
    KotClickerCounter: "kotclickercounter",
    Kot: "kot",
    KotsTracker: "kotstracker",
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
}

export function Save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
export function SaveRaw(key, value){ localStorage.setItem(key, value); }

export function Load(key){
    if (!Exists(key)){
        // default assignments
        let val = "na";
        if (key === Data.Theme) { val = "dark"; }
        if (key === Data.Username) { val = "you"; }
        if (key === Data.Deadname) { val = "Gabriele"; }
        if (key === Data.Name) { val = "Alex"; }
        Save(key, val);
    }
    return JSON.parse(localStorage.getItem(key));
}
export function LoadRaw(key, value){ return localStorage.getItem(key); }

export function Exists(key){
    return localStorage.getItem(key) !== null;
}