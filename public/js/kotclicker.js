import {loadraw, saveraw } from './savedata.js';
import { Data } from './savedata.js'
import { button } from './themeswitcher.js';

const counter = document.getElementById("kot-counter");
if (counter !== null) {
    counter.innerHTML = loadraw(Data.KotClickerCounter) || 0;
}

export function increment(){
    let count = parseInt(loadraw(Data.KotClickerCounter)) || 0;
    count += 1;
    document.getElementById("kot-counter").innerHTML = count;
    if (Number.isNaN(count)){ count = 0; }
    saveraw(Data.KotClickerCounter, count);
}

const kotdata = {
    epileptic: false,
}