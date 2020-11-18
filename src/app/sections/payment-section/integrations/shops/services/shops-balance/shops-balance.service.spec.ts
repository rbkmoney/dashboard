import { TestBed } from '@angular/core/testing';

import { ShopsBalanceService } from './shops-balance.service';

describe('ShopsBalanceService', () => {
    let service: ShopsBalanceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShopsBalanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
