import { TestBed } from '@angular/core/testing';

import { CountryCodesService } from './country-codes.service';

describe('CountryCodesService', () => {
    let service: CountryCodesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CountryCodesService],
        });
        service = TestBed.inject(CountryCodesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getCountryCode', () => {
        it('should return code using country', () => {
            expect(service.getCountryCode('AGO')).toBe(8);
        });

        it('should throw an error if cannot find code using provided country', () => {
            expect(() => service.getCountryCode('AAA')).toThrowError(`Can't get code for country [AAA]`);
        });
    });

    describe('getCountryByCode', () => {
        it('should return country name using code', () => {
            expect(service.getCountryByCode(8)).toBe('AGO');
        });

        it('should throw an error if cannot find code using provided country', () => {
            expect(() => service.getCountryByCode(100500)).toThrowError(`Can't get country using code [100500]`);
        });
    });

    describe('isCodeExist', () => {
        it('should return true if code can be found', () => {
            expect(service.isCodeExist(8)).toBe(true);
        });

        it('should return false if code cannot be found', () => {
            expect(service.isCodeExist(100500)).toBe(false);
        });
    });

    describe('isCountryExist', () => {
        it('should return true if country can be found', () => {
            expect(service.isCountryExist('AGO')).toBe(true);
        });

        it('should return false if country cannot be found', () => {
            expect(service.isCountryExist('RRR')).toBe(false);
        });
    });
});
