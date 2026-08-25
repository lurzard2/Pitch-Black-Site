export const theme = "theme";                                                                 // site theme string
export function save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
export function load(key){
    return JSON.parse(localStorage.getItem(key));
}

export function exists(key){
    return localStorage.getItem(key) !== null;
}

const Path = {
    LOCAL: "local",
    SESSION: "session",
}

/*Keys and their default values.
Actual values are stored locally, not in variables here, we just Get/Set them with the keys.
Default values for assigned keys are written as "_var"*/

const username = "username";                                                           // username for site string
const reacted = "reacted";                                                             // reacted bool

//Names
const deadname = "deadname";                                                           // vg deadname
const _deadname = "Gabriele";
const name = "name";
const _name = "Alex";                                                                  // vg name
