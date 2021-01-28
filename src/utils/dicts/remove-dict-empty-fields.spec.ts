import { Dict } from '@dsh/type-utils';

import { removeDictEmptyFields } from './remove-dict-empty-fields';

describe('removeDictEmptyFields', () => {
    let data: Dict<any>;

    it('should remove fields with empty strings', () => {
        data = {
            a: '1',
            b: '22',
            c: '0afaf',
            d: '',
            e: '7',
            g: '',
        };

        expect(removeDictEmptyFields(data)).toEqual({
            a: '1',
            b: '22',
            c: '0afaf',
            e: '7',
        });
    });

    it('should remove empty arrays', () => {
        data = {
            a: [],
            b: ['', ''],
            c: [],
            d: [0],
            e: [],
            g: [5, 5],
        };

        expect(removeDictEmptyFields(data)).toEqual({
            b: ['', ''],
            d: [0],
            g: [5, 5],
        });
    });

    it('should remove empty objects', () => {
        data = {
            a: { a: null },
            b: {},
            c: { a: null, b: 'b' },
            d: {},
            e: {},
            g: { mine: '' },
        };

        expect(removeDictEmptyFields(data)).toEqual({
            a: { a: null },
            c: { a: null, b: 'b' },
            g: { mine: '' },
        });
    });

    it('should remove nil fields', () => {
        data = {
            a: null,
            b: undefined,
            c: 0,
            d: null,
            e: 1,
            g: undefined,
        };

        expect(removeDictEmptyFields(data)).toEqual({
            c: 0,
            e: 1,
        });
    });

    it('should ignore boolean values', () => {
        data = {
            a: true,
            b: false,
            c: true,
            d: true,
            e: false,
        };

        expect(removeDictEmptyFields(data)).toEqual({
            a: true,
            b: false,
            c: true,
            d: true,
            e: false,
        });
    });
});
