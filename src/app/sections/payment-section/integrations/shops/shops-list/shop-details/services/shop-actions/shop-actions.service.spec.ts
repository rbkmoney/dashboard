import { TestBed } from '@angular/core/testing';

import { ShopActionsService } from './shop-actions.service';

describe('ShopActionsService', () => {
    let service: ShopActionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShopActionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
