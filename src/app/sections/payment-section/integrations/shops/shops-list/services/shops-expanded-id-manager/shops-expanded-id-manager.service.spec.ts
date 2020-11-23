import { TestBed } from '@angular/core/testing';

import { ShopsExpandedIdManagerService } from './shops-expanded-id-manager.service';

describe('ShopsExpandedIdManagerService', () => {
    let service: ShopsExpandedIdManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShopsExpandedIdManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
