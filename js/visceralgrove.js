import {_, Save, Load } from './main.js';

const __ = Load(_.VisceralGrove);
function _Save() { Save(_.VisceralGrove, __); }

const path = "https://lurvixen.com/visceralgrove/";
function GetChapter(dest){
    return window.location.href === path + dest;
}
function SetChapter(dest){
    window.location.replace(path + dest);
}

if (GetChapter(2)){
    setTimeout(function(){ SetChapter(""); }, 2500);
}

requestAnimationFrame(UPDATE);
function UPDATE(){

    _Save();

    requestAnimationFrame(UPDATE);
}