import { TestBed } from '@angular/core/testing';

import { UuidGeneratorService } from './uuid-generator.service';

describe('UuidGeneratorService', () => {
    let service: UuidGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UuidGeneratorService],
        });
        service = TestBed.inject(UuidGeneratorService);
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
