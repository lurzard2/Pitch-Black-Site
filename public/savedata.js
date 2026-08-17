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
    modify(false, key, value, Path.LOCAL)
}
function tryLoadSession(key, value) {
    modify(false, key, value, Path.SESSION);
}

function modify(flag, key, value, path) {
    if (cantGetStorage()) {
        return;
    }
    if (flag) {
        if (path === Path.LOCAL) {
            localStorage.setItem(key, value);
        }
        if (path === Path.SESSION) {
            sessionStorage.setItem(key, value);
        }
    } else {
        if (path === Path.LOCAL) {
            return localStorage.getItem(key);
        }
        if (path === Path.SESSION) {
            return sessionStorage.getItem(key);
        }
    }
}

