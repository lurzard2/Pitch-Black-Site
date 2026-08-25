const Path = {
    LOCAL: "local",
    SESSION: "session",
}

function save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
function load(key){
    return JSON.parse(localStorage.getItem(key));
}

<!--
TODO: LATER-Saving and loading data from a file.

Keys and their default values.
Actual values are stored locally, not in variables here, we just Get/Set them with the keys.
Default values for assigned keys are written as "_var"
-->

const username = "username";                                                           // username for site string
const reacted = "reacted";                                                             // reacted bool
const theme = "theme";                                                                 // site theme string

<!--Names-->
const deadname = "deadname";                                                           // vg deadname
const _deadname = "Gabriele";
const name = "name";
const _name = "Alex";                                                                  // vg name
