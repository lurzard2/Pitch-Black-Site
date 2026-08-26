import {loadraw, saveraw, exists, save} from './savedata.js';
import { Data } from './savedata.js'
import { button } from './themeswitcher.js';

document.querySelector('.counter').innerHTML = loadraw(Data.KotClickerCounter);

export function increment(){
    let count = exists(Data.KotClickerCounter) ? parseInt(loadraw(Data.KotClickerCounter)) : saveraw(Data.KotClickerCounter, 0);
    count += 1;
    document.querySelector('.counter').innerHTML = count;
    saveraw(Data.KotClickerCounter, count);
}