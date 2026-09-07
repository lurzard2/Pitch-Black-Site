import {_, Save, Load } from './main.js';

const __ = Load(_.VisceralGrove);
function _Save() { Save(_.VisceralGrove, __); }

const path = "https://lurvixen.com/visceralgrove";
function GetChapter(dest){
    return window.location.href === path + dest;
}
function SetChapter(dest = ""){
    // Start game flag to change index
    if (GetChapter(2)){
        console.log("ENTER");
    }

    // go to index by default
    window.location.replace(dest === "" ? path : path + "/" + dest);
}

requestAnimationFrame(UPDATE);
function UPDATE(){

    _Save();

    requestAnimationFrame(UPDATE);
}