export const Data = {
    Theme: "theme",
    Username: "username",
    Deadname: "deadname",
    Name: "name",
}

export const Themes = {
    Dark: "dark",
    Light: "light",
}

export function save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
export function load(key){
    if (exists(key)){
        // default assignments
        let val = "na";
        if (key === Data.Theme) { val = "dark"; }
        if (key === Data.Username) { val = "you"; }
        if (key === Data.Deadname) { val = "Gabriele"; }
        if (key === Data.Name) { val = "Alex"; }
        save(key, val);
    }
    return JSON.parse(localStorage.getItem(key));
}

function exists(key){
    return localStorage.getItem(key) !== null;
}