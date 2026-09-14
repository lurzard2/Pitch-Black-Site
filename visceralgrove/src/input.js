// Player controller by listening to key presses
export const controller = {};
export function GetInput(key) {
    return controller[key];
}
window.addEventListener('keydown', function(e) {
    controller[e.key] = true;
})
window.addEventListener('keyup', function(e) {
    controller[e.key] = false;
})