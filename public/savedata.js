const Path = {
    LOCAL: "local",
    SESSION: "session",
}

function cantGetStorage(){ return typeof (Storage) == "undefined"; }

function trySaveLocal(key, value) {
    modify(true, key, value, Path.LOCAL)
}
function trySaveSession(key, value){
    modify(true, key, value, Path.SESSION);
}

function tryLoadLocal(key, value) {
    return modify(false, key, value, Path.LOCAL)
}
function tryLoadSession(key, value) {
    return modify(false, key, value, Path.SESSION);
}

function modify(set, key, value, path) {
    if (cantGetStorage()) {
        return;
    }
    if (set) {
        if (path === Path.LOCAL) {
            localStorage.setItem(key, value);
        }
        else if (path === Path.SESSION) {
            sessionStorage.setItem(key, value);
        }
    } else {
        if (path === Path.LOCAL) {
            return localStorage.getItem(key);
        }
        else if (path === Path.SESSION) {
            return sessionStorage.getItem(key);
        }
    }
}

