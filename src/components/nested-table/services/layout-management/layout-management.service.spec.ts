import { TestBed } from '@angular/core/testing';

import { LayoutManagementService } from './layout-management.service';

describe('LayoutManagementService', () => {
    let service: LayoutManagementService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [LayoutManagementService],
        });

        service = TestBed.inject(LayoutManagementService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('methods', () => {});
});
