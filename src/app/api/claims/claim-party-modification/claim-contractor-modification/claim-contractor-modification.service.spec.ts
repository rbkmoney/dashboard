import { TestBed } from '@angular/core/testing';

import { ClaimContractorModificationService } from './claim-contractor-modification.service';

describe('ClaimContractorModificationService', () => {
    let service: ClaimContractorModificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ClaimContractorModificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
