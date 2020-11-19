import { TestBed } from '@angular/core/testing';

import { FetchShopsService } from './fetch-shops.service';

describe('FetchShopsService', () => {
    let service: FetchShopsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FetchShopsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
