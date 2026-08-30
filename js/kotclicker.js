import {_, Load, Save, Chance} from './main.js';

const __ = Load(_.KotClicker);
function _Save() { Save(_.KotClicker, __); }

// on site load, load and print the count saved
const counter = document.querySelectorAll(".kot-count");
if (counter !== null) {
    counter.forEach((el) => {
        el.innerHTML = __.Clicks.Total;
    })
}

// used for kot clicker, on click increment the counter
export function IncrementCounter(){
    __.Clicks.Total += 1;
    counter.forEach((el) => {
        el.innerHTML = __.Clicks.Total;
    })
    return __.Clicks.Total;
}

// add button to div
const kotContainer = document.getElementById("kot-holder");
if (kotContainer !== null){
    kotContainer.innerHTML = '<div id="kot-button"></div>';
}

// name element
const kotname = document.getElementById("kot-name");
// button element
const kot = document.getElementById("kot-button");
if (kot !== null){
    kot.className = __.Kot.State ? "light" : "dark";
    kot.onclick = function (){
        __.Kot.State = !__.Kot.State;
        IncrementCounter();
        kot.className = __.Kot.State ? "light" : "dark";
        _Save();
    }
}


// add update functions here
requestAnimationFrame(UPDATE);
function UPDATE(){
    //console.log("hi");



    requestAnimationFrame(UPDATE);
}