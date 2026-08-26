import {loadraw, saveraw, exists, save} from './savedata.js';
import { Data } from './savedata.js'

document.querySelector('.counter').innerHTML = loadraw(Data.KotClickerCounter) || 0;

export function increment(){
    let count = parseInt(loadraw(Data.KotClickerCounter)) || 0;
    count += 1;
    document.querySelector('.counter').innerHTML = count;
    if (Number.isNaN(count)){ count = 0; }
    saveraw(Data.KotClickerCounter, count);
}