import { TestBed } from '@angular/core/testing';

import { CancelHoldService } from './cancel-hold.service';

xdescribe('CancelHoldService', () => {
    let service: CancelHoldService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CancelHoldService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
