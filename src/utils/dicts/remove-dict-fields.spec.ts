import { Dict } from '@dsh/type-utils';

import { removeDictFields } from './remove-dict-fields';

describe('removeDictFields', () => {
    let data: Dict<any>;

    it('should remove fields if predicate returned false on its value', () => {
        data = {
            a: 1,
            b: 2,
            c: 0,
            d: 0,
            e: 7,
            g: 2,
        };

        expect(removeDictFields(data, (value: number) => value >= 2)).toEqual({
            b: 2,
            e: 7,
            g: 2,
        });
    });

    it('should work with non custom predicate functions', () => {
        data = {
            a: 1,
            b: 2,
            c: 0,
            d: 0,
            e: 1,
            g: 55,
        };

        expect(removeDictFields(data, Boolean)).toEqual({
            a: 1,
            b: 2,
            e: 1,
            g: 55,
        });
    });
});
