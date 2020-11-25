import { TestBed } from '@angular/core/testing';

import { ShopsFiltersStoreService } from './shops-filters-store.service';

describe('ShopsFiltersStoreService', () => {
    let service: ShopsFiltersStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShopsFiltersStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
