import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@ngneat/transloco';
import { instance, mock, when } from 'ts-mockito';

import { PaymentErrorMessagePipe } from './payment-error-message.pipe';

describe('PaymentErrorMessagePipe', () => {
    let pipe: PaymentErrorMessagePipe;
    let mockTranslocoService: TranslocoService;

    beforeEach(() => {
        mockTranslocoService = mock(TranslocoService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PaymentErrorMessagePipe,
                {
                    provide: TranslocoService,
                    useFactory: () => instance(mockTranslocoService),
                },
            ],
        });

        pipe = TestBed.inject(PaymentErrorMessagePipe);
    });

    it('should create pipe', () => {
        expect(pipe).toBeTruthy();
    });

    describe('transform', () => {
        it('should return single message for not nested error object', () => {
            when(mockTranslocoService.translate<string>('paymentErrors.myCode')).thenReturn('myErrorMessage');
            expect(
                pipe.transform({
                    code: 'myCode',
                    subError: null,
                })
            ).toBe('myErrorMessage');
        });

        it('should return a string with "->" separator with error messages', () => {
            when(mockTranslocoService.translate<string>('paymentErrors.myCode.message')).thenReturn('my message');
            when(mockTranslocoService.translate<string>('paymentErrors.myCode.anotherCode.message')).thenReturn(
                'another message'
            );
            when(mockTranslocoService.translate<string>('paymentErrors.myCode.anotherCode.thirdCode')).thenReturn(
                'third message'
            );
            expect(
                pipe.transform({
                    code: 'myCode',
                    subError: {
                        code: 'anotherCode',
                        subError: {
                            code: 'thirdCode',
                            subError: null,
                        },
                    },
                })
            ).toBe('my message -> another message -> third message');
        });

        it('should return unknown error if paymentErrors does not contain translation for code', () => {
            when(mockTranslocoService.translate<string>('paymentErrors.myCode')).thenReturn('paymentErrors.myCode');
            when(mockTranslocoService.translate<string>('unknownError')).thenReturn('myUnknownError');
            expect(
                pipe.transform({
                    code: 'myCode',
                    subError: null,
                })
            ).toBe('myUnknownError');
        });
    });
});
