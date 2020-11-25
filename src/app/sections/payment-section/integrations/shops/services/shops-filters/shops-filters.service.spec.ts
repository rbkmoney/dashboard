import { TestBed } from '@angular/core/testing';

import { ShopsFiltersService } from './shops-filters.service';

describe('ShopsFiltersService', () => {
    let service: ShopsFiltersService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShopsFiltersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
