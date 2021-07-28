import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { instance, mock } from 'ts-mockito';

import { CountryCodesService } from '@dsh/app/shared/services/country-codes/country-codes.service';

import { InternationalPayoutToolFormService } from './international-payout-tool-form.service';

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
                currency: '',
            });
        });
    });
});
