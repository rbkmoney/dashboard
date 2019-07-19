import random from 'lodash.random';
function genID(length: number) {
    let result = '';
    for (let i = 0; i < length; ++i) {
        result += random(35).toString(36);
    }
    return result;
}
export function genXRequestID() {
    return genID(32);
}
