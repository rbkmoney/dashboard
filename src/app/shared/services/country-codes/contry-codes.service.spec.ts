import { TestBed } from '@angular/core/testing';

import { CountryCodesService } from './country-codes.service';

// TODO: implement unit test
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
});
