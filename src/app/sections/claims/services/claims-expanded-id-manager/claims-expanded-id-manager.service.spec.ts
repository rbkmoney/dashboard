import { TestBed } from '@angular/core/testing';

import { ClaimsExpandedIdManagerService } from './claims-expanded-id-manager.service';

describe('ClaimsExpandedIdManagerService', () => {
    let service: ClaimsExpandedIdManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ClaimsExpandedIdManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
