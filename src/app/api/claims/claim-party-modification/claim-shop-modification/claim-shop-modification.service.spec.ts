import { TestBed } from '@angular/core/testing';

import { ClaimShopModificationService } from './claim-shop-modification.service';

describe('ClaimShopModificationService', () => {
    let service: ClaimShopModificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ClaimShopModificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
