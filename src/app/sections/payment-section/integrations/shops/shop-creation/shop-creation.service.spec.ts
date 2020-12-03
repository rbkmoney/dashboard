import { TestBed } from '@angular/core/testing';

import { ShopCreationService } from './shop-creation.service';

describe('CreateShopService', () => {
    let service: ShopCreationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShopCreationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
