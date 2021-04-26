import { PaymentSearchResult } from '@dsh/api-codegen/capi';

import { StatusColor } from '../../../../../../../../theme-manager';
import { PaymentStatusColorPipe } from './status-color.pipe';

const STATUS_ENUM = PaymentSearchResult.StatusEnum;

describe('PaymentStatusColorPipe', () => {
    let pipe: PaymentStatusColorPipe;

    beforeEach(() => {
        pipe = new PaymentStatusColorPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    describe('transform', () => {
        it('should return "success" color for Captured or Processed statuses', () => {
            expect(pipe.transform(STATUS_ENUM.Captured)).toBe(StatusColor.Success);
            expect(pipe.transform(STATUS_ENUM.Processed)).toBe(StatusColor.Success);
        });

        it('should return "warn" color for Failed or Cancelled statuses', () => {
            expect(pipe.transform(STATUS_ENUM.Failed)).toBe(StatusColor.Warn);
            expect(pipe.transform(STATUS_ENUM.Cancelled)).toBe(StatusColor.Warn);
        });

        it('should return "pending" color for Pending status', () => {
            expect(pipe.transform(STATUS_ENUM.Pending)).toBe(StatusColor.Pending);
        });

        it('should return "neutral" color for Refunded status', () => {
            expect(pipe.transform(STATUS_ENUM.Refunded)).toBe(StatusColor.Neutral);
        });
    });
});
