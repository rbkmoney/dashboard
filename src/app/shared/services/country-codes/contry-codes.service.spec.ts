import { TestBed } from '@angular/core/testing';

import { CountryCodesService } from './country-codes.service';

describe('ContryCodesService', () => {
    let service: CountryCodesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CountryCodesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
