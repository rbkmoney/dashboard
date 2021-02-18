import { TestBed } from '@angular/core/testing';

import { IconsService } from './icons.service';

describe('IconsService', () => {
    let service: IconsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [IconsService],
        });

        service = TestBed.inject(IconsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
