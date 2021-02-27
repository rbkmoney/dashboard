import { TestBed } from '@angular/core/testing';

import { ScreenSizeControlService } from './screen-size-control.service';

describe('ScreenSizeControlService', () => {
    let service: ScreenSizeControlService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ScreenSizeControlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
