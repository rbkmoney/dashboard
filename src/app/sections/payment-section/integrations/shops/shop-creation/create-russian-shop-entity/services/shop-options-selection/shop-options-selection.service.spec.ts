import { TestBed } from '@angular/core/testing';

import { ShopOptionsSelectionService } from './shop-options-selection.service';

describe('ShopSelectorService', () => {
    let service: ShopOptionsSelectionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShopOptionsSelectionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
