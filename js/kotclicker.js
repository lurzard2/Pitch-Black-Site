import {_, Load, Save} from './main.js';

const __ = Load(_.KotClicker);
function _Save() { Save(_.KotClicker, __); }

// on site load, load and print the count saved
const counter = document.getElementById("kot-counter");
if (counter !== null) {
    counter.innerHTML = __.Clicks.Total;
}

// used for kot clicker, on click increment the counter
export function IncrementCounter(){
    __.Clicks.Total += 1;
    counter.innerHTML = __.Clicks.Total;
    return __.Clicks.Total;
}

// add button to div
const kotContainer = document.getElementById("kot-holder");
if (kotContainer !== null){
    kotContainer.innerHTML = '<button id="kot-button"></button>';
}

// name element
const kotname = document.getElementById("kot-name");
// button element
const kot = document.getElementById("kot-button");
if (kot !== null){
    kot.onclick = function (){
        __.Kot.State = !__.Kot.State;
        kot.className = __.Kot.State ? "light" : "dark";
        _Save();
    }
}