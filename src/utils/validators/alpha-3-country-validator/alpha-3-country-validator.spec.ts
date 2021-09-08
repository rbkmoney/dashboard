import { FormControl } from '@ngneat/reactive-forms';

import { alpha3CountryValidator } from '@dsh/utils';

describe('alpha3CountryValidator', () => {
    it('should be valid', () => {
        expect(alpha3CountryValidator(new FormControl('USA'))).toBeNull();
    });

    describe('should be invalid', () => {
        const unknownCountryCode = { unknownCountryCode: true };

        it('non-existent country', () => {
            expect(alpha3CountryValidator(new FormControl('XXX'))).toEqual(unknownCountryCode);
        });

        it('empty', () => {
            expect(alpha3CountryValidator(new FormControl(''))).toEqual(null);
        });

        it('null', () => {
            expect(alpha3CountryValidator(new FormControl(null))).toEqual(null);
        });

        it('undefined', () => {
            expect(alpha3CountryValidator(new FormControl(undefined))).toEqual(null);
        });
    });
});
