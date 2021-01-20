import { TestBed } from '@angular/core/testing';

import { PaymentsService } from './payments.service';

xdescribe('PaymentsService', () => {
    let service: PaymentsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PaymentsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
