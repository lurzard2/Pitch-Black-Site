import {_, Save, Load } from './main.js';

const __ = Load(_.VisceralGrove);
function _Save() { Save(_.VisceralGrove, __); }

requestAnimationFrame(UPDATE);
function UPDATE(){

    _Save();

    requestAnimationFrame(UPDATE);
}