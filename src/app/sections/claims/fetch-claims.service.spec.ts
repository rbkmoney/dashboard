import { TestBed } from '@angular/core/testing';

import { ClaimsService } from '../../api/claims';
import { FetchClaimsService } from './services/fetch-claims/fetch-claims.service';

class MockApiClaimsService {}

describe('FetchClaimsService', () => {
    let service: FetchClaimsService;
    let apiClaimsService: MockApiClaimsService;

    beforeEach(() => {
        apiClaimsService = new MockApiClaimsService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FetchClaimsService,
                {
                    provide: ClaimsService,
                    useValue: apiClaimsService,
                },
            ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(FetchClaimsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
