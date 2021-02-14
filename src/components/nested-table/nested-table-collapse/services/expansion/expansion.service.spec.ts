import { TestBed } from '@angular/core/testing';

import { ExpansionService } from './expansion.service';

describe('ExpansionService', () => {
    let service: ExpansionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ExpansionService],
        });

        service = TestBed.inject(ExpansionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
