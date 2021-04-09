import { TestBed } from '@angular/core/testing';

import { PaymentStatus } from '@dsh/api-codegen/anapi';

import { HoldActivePipe } from './hold-active.pipe';

describe('HoldActivePipe', () => {
    let pipe: HoldActivePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HoldActivePipe],
        });

        pipe = TestBed.inject(HoldActivePipe);
    });

    it('should create pipe', () => {
        expect(pipe).toBeTruthy();
    });

    describe('transform', () => {
        it('should return true if status is processed and date is in the future than now', () => {
            const date = new Date(Date.now() + 1000);

            expect(pipe.transform(date, PaymentStatus.StatusEnum.Processed)).toBe(true);
        });

        it('should return false if status is not processed and date is in the future than now', () => {
            const date = new Date(Date.now() + 1000);

            expect(pipe.transform(date, PaymentStatus.StatusEnum.Captured)).toBe(false);
        });

        it('should return false if status is processed but date is earlier or equal to now', () => {
            const date = new Date(Date.now());

            expect(pipe.transform(date, PaymentStatus.StatusEnum.Processed)).toBe(false);
        });
    });
});
