import random from 'lodash.random';

/**
 * Generate random string containing 0-9 and a-z
 */
export function randomString(length: number): string {
    let result = '';
    for (let i = 0; i < length; i += 1) {
        result += random(35).toString(36);
    }
    return result;
}
