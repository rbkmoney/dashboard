import { TestBed } from '@angular/core/testing';

import { CreateHoldService } from './create-hold.service';

xdescribe('CreateHoldService', () => {
    let service: CreateHoldService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CreateHoldService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
