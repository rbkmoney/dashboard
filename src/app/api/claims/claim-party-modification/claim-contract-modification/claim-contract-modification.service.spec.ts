import { TestBed } from '@angular/core/testing';

import { ClaimContractModificationService } from './claim-contract-modification.service';

describe('ClaimContractModificationService', () => {
    let service: ClaimContractModificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ClaimContractModificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
