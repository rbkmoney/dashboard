import { randomString } from './random-string';

describe('randomString', () => {
    it('should create a string of length 10', () => {
        const length = 1000;
        const str = randomString(length);
        expect(str.length).toBe(length);
    });
});
