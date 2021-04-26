import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentFlow, PaymentFlowHold, PaymentStatus } from '@dsh/api-codegen/anapi';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { ButtonModule } from '@dsh/components/buttons';

import { HumanizeDurationModule } from '../../../../../../../humanize-duration';
import { generateMockPayment } from '../../../tests/generate-mock-payment';
import { CancelHoldService } from './cancel-hold';
import { CreateHoldService } from './create-hold';
import { HoldDetailsComponent } from './hold-details.component';
import { HoldActivePipe } from './pipes/hold-active/hold-active.pipe';

describe('HoldComponent', () => {
    let component: HoldDetailsComponent;
    let fixture: ComponentFixture<HoldDetailsComponent>;
    let mockCancelHoldService: CancelHoldService;
    let mockCreateHoldService: CreateHoldService;

    beforeEach(() => {
        mockCancelHoldService = mock(CancelHoldService);
        mockCreateHoldService = mock(CreateHoldService);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), FlexLayoutModule, HumanizeDurationModule, ButtonModule],
            declarations: [HoldDetailsComponent, HoldActivePipe],
            providers: [
                {
                    provide: CancelHoldService,
                    useFactory: () => instance(mockCancelHoldService),
                },
                {
                    provide: CreateHoldService,
                    useFactory: () => instance(mockCreateHoldService),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HoldDetailsComponent);
        component = fixture.componentInstance;
        component.payment = generateMockPayment({
            flow: {
                type: PaymentFlow.TypeEnum.PaymentFlowHold,
                heldUntil: new Date(),
                onHoldExpiration: PaymentFlowHold.OnHoldExpirationEnum.Capture,
            } as PaymentFlowHold,
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('flowHold', () => {
        it('should return flow object from payment', () => {
            const flow = {
                type: PaymentFlow.TypeEnum.PaymentFlowHold,
                heldUntil: new Date(),
                onHoldExpiration: PaymentFlowHold.OnHoldExpirationEnum.Capture,
            } as PaymentFlowHold;

            component.payment = generateMockPayment({
                flow,
            });

            expect(component.flowHold).toEqual(flow);
        });
    });

    describe('holdDate', () => {
        let flow: PaymentFlowHold;

        it('should return string representation of current date', () => {
            flow = {
                type: PaymentFlow.TypeEnum.PaymentFlowHold,
                heldUntil: new Date(),
                onHoldExpiration: PaymentFlowHold.OnHoldExpirationEnum.Capture,
            };

            component.payment = generateMockPayment({
                flow,
            });

            expect(component.holdDate).toBe(flow.heldUntil.toString());
        });

        it('should return empty string if heldUntil was not provided', () => {
            flow = {
                type: PaymentFlow.TypeEnum.PaymentFlowHold,
                onHoldExpiration: PaymentFlowHold.OnHoldExpirationEnum.Capture,
            };

            component.payment = generateMockPayment({
                flow,
            });

            expect(component.holdDate).toBe('');
        });
    });

    describe('activeHoldText', () => {
        let flow: PaymentFlowHold;

        it('should return "holdWithCapture" for capture status', () => {
            flow = {
                type: PaymentFlow.TypeEnum.PaymentFlowHold,
                heldUntil: new Date(),
                onHoldExpiration: PaymentFlowHold.OnHoldExpirationEnum.Capture,
            };

            component.payment = generateMockPayment({
                flow,
            });

            expect(component.activeHoldText).toBe('holdWithCapture');
        });

        it('should return "holdWithCancel" for cancel status', () => {
            flow = {
                type: PaymentFlow.TypeEnum.PaymentFlowHold,
                heldUntil: new Date(),
                onHoldExpiration: PaymentFlowHold.OnHoldExpirationEnum.Cancel,
            };

            component.payment = generateMockPayment({
                flow,
            });

            expect(component.activeHoldText).toBe('holdWithCancel');
        });
    });

    describe('expiredHoldText', () => {
        it('should return "capturedHoldMessage" for capture status', () => {
            component.payment = generateMockPayment({
                status: PaymentStatus.StatusEnum.Captured,
            });

            expect(component.expiredHoldText).toBe('capturedHoldMessage');
        });

        it('should return "cancelledHoldMessage" for cancel status', () => {
            component.payment = generateMockPayment({
                status: PaymentStatus.StatusEnum.Cancelled,
            });

            expect(component.expiredHoldText).toBe('cancelledHoldMessage');
        });

        it('should return empty string for others statuses', () => {
            component.payment = generateMockPayment({
                status: PaymentStatus.StatusEnum.Pending,
            });

            expect(component.expiredHoldText).toBe('');
        });
    });

    describe('cancelHold', () => {
        it('should use payment data to open cancel dialog', () => {
            const mockPayment = generateMockPayment({
                id: 'mine_one',
            });

            component.payment = mockPayment;

            when(
                mockCancelHoldService.openDialog(
                    deepEqual({ invoiceID: mockPayment.invoiceID, paymentID: mockPayment.id })
                )
            ).thenReturn(of(BaseDialogResponseStatus.Cancelled));

            component.cancelHold();

            verify(
                mockCancelHoldService.openDialog(
                    deepEqual({ invoiceID: mockPayment.invoiceID, paymentID: mockPayment.id })
                )
            ).once();
            expect().nothing();
        });

        it('should send status changed event using dialog payment data', () => {
            const paymentState = {
                a: generateMockPayment({
                    id: 'mine_one',
                }),
                b: generateMockPayment({
                    id: 'mine_two',
                }),
            };

            component.payment = paymentState.a;

            const spyOnStatusChanged = spyOn(component.statusChanged, 'emit').and.callThrough();

            when(
                mockCancelHoldService.openDialog(
                    deepEqual({ invoiceID: paymentState.a.invoiceID, paymentID: paymentState.a.id })
                )
            ).thenReturn(of(BaseDialogResponseStatus.Success));

            component.cancelHold();

            component.payment = paymentState.b;

            expect(spyOnStatusChanged).toHaveBeenCalledTimes(1);
            expect(spyOnStatusChanged).toHaveBeenCalledWith({
                invoiceID: paymentState.a.invoiceID,
                paymentID: paymentState.a.id,
            });
            expect(spyOnStatusChanged).not.toHaveBeenCalledWith({
                invoiceID: paymentState.b.invoiceID,
                paymentID: paymentState.b.id,
            });
        });
    });

    describe('confirmHold', () => {
        it('should open confirm dialog using payment data', () => {
            const mockPayment = generateMockPayment({
                id: 'mine_one',
            });

            component.payment = mockPayment;

            when(
                mockCreateHoldService.openDialog(
                    deepEqual({
                        invoiceID: mockPayment.invoiceID,
                        paymentID: mockPayment.id,
                        currency: mockPayment.currency,
                        maxAllowedAmount: mockPayment.amount,
                    })
                )
            ).thenReturn(of(BaseDialogResponseStatus.Cancelled));

            component.confirmHold();

            verify(
                mockCreateHoldService.openDialog(
                    deepEqual({
                        invoiceID: mockPayment.invoiceID,
                        paymentID: mockPayment.id,
                        currency: mockPayment.currency,
                        maxAllowedAmount: mockPayment.amount,
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should send status changed event using dialog payment data', () => {
            const paymentState = {
                a: generateMockPayment({
                    id: 'mine_one',
                }),
                b: generateMockPayment({
                    id: 'mine_two',
                }),
            };

            component.payment = paymentState.a;

            const spyOnStatusChanged = spyOn(component.statusChanged, 'emit').and.callThrough();

            when(
                mockCreateHoldService.openDialog(
                    deepEqual({
                        invoiceID: paymentState.a.invoiceID,
                        paymentID: paymentState.a.id,
                        currency: paymentState.a.currency,
                        maxAllowedAmount: paymentState.a.amount,
                    })
                )
            ).thenReturn(of(BaseDialogResponseStatus.Success));

            component.confirmHold();

            component.payment = paymentState.b;

            expect(spyOnStatusChanged).toHaveBeenCalledTimes(1);
            expect(spyOnStatusChanged).toHaveBeenCalledWith({
                invoiceID: paymentState.a.invoiceID,
                paymentID: paymentState.a.id,
            });
            expect(spyOnStatusChanged).not.toHaveBeenCalledWith({
                invoiceID: paymentState.b.invoiceID,
                paymentID: paymentState.b.id,
            });
        });
    });
});
