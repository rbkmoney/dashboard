import { TestBed } from '@angular/core/testing';

import { InternationalShopFormControllerService } from './international-shop-form-controller.service';

describe('InternationalShopFormControllerService', () => {
    let service: InternationalShopFormControllerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(InternationalShopFormControllerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
