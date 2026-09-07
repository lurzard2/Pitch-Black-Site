import {_, Save, Load } from './main.js';

const __ = Load(_.VisceralGrove);
function _Save() { Save(_.VisceralGrove, __); }
function log(msg) { console.log(msg); }

const path = "https://lurvixen.com/visceralgrove";
export function GetChapter(dest){
    return window.location.href === path + dest;
}
export function SetChapter(dest = ""){
    window.location.replace(dest === "" ? path : path + "/" + dest);
}

requestAnimationFrame(UPDATE);
function UPDATE(){

    _Save();

    requestAnimationFrame(UPDATE);
}