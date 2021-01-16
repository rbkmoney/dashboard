import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { instance, mock, when } from 'ts-mockito';

import { CountryCodesService } from '@dsh/app/shared/services/country-codes/country-codes.service';
import { getAbstractControl } from '@dsh/app/shared/utils';

import { InternationalBankAccountFormValue } from '../../types/international-bank-account-form-value';
import { InternationalPayoutToolFormService } from './international-payout-tool-form.service';

function generateStringLength(symbol: string, length: number): string {
    return new Array(length).fill(symbol).join('');
}

describe('InternationalPayoutToolFormService', () => {
    let service: InternationalPayoutToolFormService;
    let mockCountryCodesService: CountryCodesService;

    beforeEach(() => {
        mockCountryCodesService = mock(CountryCodesService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                InternationalPayoutToolFormService,
                {
                    provide: CountryCodesService,
                    useFactory: () => instance(mockCountryCodesService),
                },
            ],
        });
        service = TestBed.inject(InternationalPayoutToolFormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getForm', () => {
        it('should create new form', () => {
            expect(service.getForm().value).toEqual({
                number: '',
                iban: '',
                abaRtn: '',
                address: '',
                bic: '',
                name: '',
                country: '',
            });
        });

        describe('validations', () => {
            let form: FormGroup<InternationalBankAccountFormValue>;
            let control: FormControl<string>;

            beforeEach(() => {
                form = service.getForm();
            });

            it('should validate "number" as a string of numbers or/and caps latin chars from 8 to 40 symbols', () => {
                control = getAbstractControl(form, 'number');

                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1', 8));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('A', 8));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1A', 4));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1', 40));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('A', 40));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('A1', 20));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1', 41));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength('1', 7));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('1');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('A');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('asfaf');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('-1');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);
            });

            it('should validate "iban" as a string of numbers or/and caps latin chars from 14 to 35 symbols', () => {
                control = getAbstractControl(form, 'iban');

                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('2', 14));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('V', 14));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('B2', 7));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('5', 35));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('B', 35));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('2', 36));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength('2', 13));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength(' ', 15));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('123');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('ABC');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('ooolll');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('-1A');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);
            });

            it('it should validate "bic" as a string value of caps latin chars or/and number with length 8 or 11 together', () => {
                control = getAbstractControl(form, 'bic');

                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1B', 4));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1B', 5) + '2');
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1B', 4) + '2');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength('1B', 5));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('ABC');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength(' ', 8));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength(' ', 11));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);
            });

            it('should validate "abaRtn" as a string of numbers with length that equals 9', () => {
                control = getAbstractControl(form, 'abaRtn');

                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1', 9));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1', 8) + 'A');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength('1', 8));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength('1', 10));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue(generateStringLength(' ', 9));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);
            });

            it('should validate "name" as a string with max value with length that less or equals 100', () => {
                control = getAbstractControl(form, 'name');
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1', 100));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('A', 100));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue('ABCD');
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('1', 101));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);
            });

            it('should validate "country" as a country 3 letters code name', () => {
                control = getAbstractControl(form, 'country');
                expect(control.valid).toBe(true);

                when(mockCountryCodesService.isCountryExist('USA')).thenReturn(true);
                when(mockCountryCodesService.isCountryExist('   ')).thenReturn(false);
                when(mockCountryCodesService.isCountryExist('AB')).thenReturn(false);
                when(mockCountryCodesService.isCountryExist('AAA')).thenReturn(false);

                control.setValue('USA');
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue('   ');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('AB');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);

                control.setValue('AAA');
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);
            });

            it('should validate "address" as a string with max value of 1000 letters', () => {
                control = getAbstractControl(form, 'address');
                expect(control.valid).toBe(true);

                control.setValue('addressName');
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue('address-name');
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue('address_name');
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue('ADDRESS_NAME');
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('a', 1000));
                control.updateValueAndValidity();
                expect(control.valid).toBe(true);

                control.setValue(generateStringLength('a', 1001));
                control.updateValueAndValidity();
                expect(control.valid).toBe(false);
            });

            it('form should be valid if "iban" is valid and filled', () => {
                control = getAbstractControl(form, 'iban');

                form.updateValueAndValidity();
                expect(form.valid).toBe(false);

                control.setValue(generateStringLength('2', 14));
                control.updateValueAndValidity();
                expect(form.valid).toBe(true);
            });

            it('form should be valid if "bic" is valid and filled', () => {
                control = getAbstractControl(form, 'bic');

                form.updateValueAndValidity();
                expect(form.valid).toBe(false);

                control.setValue(generateStringLength('0', 8));
                control.updateValueAndValidity();
                expect(form.valid).toBe(true);
            });

            it('form should be valid if "abaRtn" is valid and filled', () => {
                control = getAbstractControl(form, 'abaRtn');

                form.updateValueAndValidity();
                expect(form.valid).toBe(false);

                control.setValue(generateStringLength('0', 9));
                control.updateValueAndValidity();
                expect(form.valid).toBe(true);
            });

            it('form should be valid if country & address & name is valid and filled', () => {
                const countryControl = getAbstractControl(form, 'country');
                const addressControl = getAbstractControl(form, 'address');
                const nameControl = getAbstractControl(form, 'name');

                when(mockCountryCodesService.isCountryExist('USA')).thenReturn(true);
                when(mockCountryCodesService.isCountryExist('AOG')).thenReturn(true);
                when(mockCountryCodesService.isCountryExist('AAA')).thenReturn(false);

                form.updateValueAndValidity();
                expect(form.valid).toBe(false);

                countryControl.setValue('USA');
                countryControl.updateValueAndValidity();
                expect(form.valid).toBe(false);

                addressControl.setValue(generateStringLength('a', 9));
                addressControl.updateValueAndValidity();
                expect(form.valid).toBe(false);

                nameControl.setValue(generateStringLength('a', 9));
                nameControl.updateValueAndValidity();
                expect(form.valid).toBe(true);

                addressControl.setValue('');
                addressControl.updateValueAndValidity();
                expect(form.valid).toBe(false);

                addressControl.setValue('av');
                addressControl.updateValueAndValidity();
                expect(form.valid).toBe(true);

                countryControl.setValue('AAA');
                countryControl.updateValueAndValidity();
                expect(form.valid).toBe(false);

                countryControl.setValue('AOG');
                countryControl.updateValueAndValidity();
                expect(form.valid).toBe(true);
            });
        });
    });
});
