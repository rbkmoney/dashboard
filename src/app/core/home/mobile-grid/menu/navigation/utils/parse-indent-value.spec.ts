import { parseIndentValue } from './parse-indent-value';

const ERROR_MESSAGE = `Сan't parse non numeric indent`;

describe('parseIndentValue', () => {
    it('should return value as is and px units if value is number', () => {
        expect(parseIndentValue(1)).toEqual([1, 'px']);
    });

    it('should return value as a number and px units if value is numeric string', () => {
        expect(parseIndentValue('1')).toEqual([1, 'px']);
    });

    it('should parse custom units from string value', () => {
        expect(parseIndentValue('1em')).toEqual([1, 'em']);
    });

    it('should throw an error if number part of string is not parsable', () => {
        expect(() => {
            parseIndentValue('-)1em');
        }).toThrowError(ERROR_MESSAGE);
    });

    it('should throw an error string is not parsable in valid number', () => {
        expect(() => {
            parseIndentValue('-)1');
        }).toThrowError(ERROR_MESSAGE);
    });
});
