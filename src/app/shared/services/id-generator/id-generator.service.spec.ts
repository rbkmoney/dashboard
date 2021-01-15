import { TestBed } from '@angular/core/testing';

import { IdGeneratorService } from './id-generator.service';

describe('IdGeneratorService', () => {
    let service: IdGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IdGeneratorService],
        });
        service = TestBed.inject(IdGeneratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('generateUUID', () => {
        it('should generate uuid', () => {
            expect(service.generateUUID()).toBeTruthy();
        });

        it('new generated uuid should be not like it was before', () => {
            expect(service.generateUUID()).not.toBe(service.generateUUID());
        });
    });
});
