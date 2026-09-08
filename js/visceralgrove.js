import {_, Save, Load } from './main.js';

const __ = Load(_.VisceralGrove);
function _Save() { Save(_.VisceralGrove, __); }
function log(msg) { console.log(msg); }

const path = "https://lurvixen.com/visceralgrove";
export function GetChapter(dest){
    return window.location.href === path + dest;
}
export function SetChapter(dest = "", replace = false){
    const href = dest === "" ? path : path + "/" + dest;
    if (replace){
        // prevents backtracking
        window.location.replace(href);
        return
    }
    window.location.href = href;
}

export function Flag(name, value){
    __.Flags[name] = value
    _Save()
}
export function GetFlag(name, value){
    return __.Flags[name] === value;
}
export function HasFlagged(name){
    return GetFlag(name, true);
}