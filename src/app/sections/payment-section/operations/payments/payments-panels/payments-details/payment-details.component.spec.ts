import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { instance, mock, verify } from 'ts-mockito';

import { Invoice, PaymentSearchResult } from '@dsh/api-codegen/anapi';

import { PaymentsService } from '../../services/payments/payments.service';
import { generateMockPayment } from '../../tests/generate-mock-payment';
import { PaymentDetailsComponent } from './payment-details.component';
import { InvoiceDetailsService } from './services/invoice-details/invoice-details.service';

@Component({
    selector: 'dsh-payment-main-info',
    template: '',
})
class MockPaymentMainInfoComponent {
    @Input() payment: PaymentSearchResult;
}

@Component({
    selector: 'dsh-payment-invoice-info',
    template: '',
})
class MockPaymentInvoiceInfoComponent {
    @Input() invoice: Invoice;
}

@Component({
    selector: 'dsh-refunds',
    template: '',
})
class MockRefundsComponent {
    @Input() invoiceID: string;
    @Input() paymentID: string;
    @Input() shopID: string;
    @Input() currency: string;
    @Input() maxRefundAmount: number;
    @Input() status: PaymentSearchResult.StatusEnum;

    @Output() statusChanged = new EventEmitter<void>();
}

describe('PaymentDetailsComponent', () => {
    let component: PaymentDetailsComponent;
    let fixture: ComponentFixture<PaymentDetailsComponent>;
    let mockInvoiceDetailsService: InvoiceDetailsService;
    let mockPaymentsService: PaymentsService;

    beforeEach(() => {
        mockInvoiceDetailsService = mock(InvoiceDetailsService);
        mockPaymentsService = mock(PaymentsService);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatDividerModule],
            declarations: [
                PaymentDetailsComponent,
                MockPaymentMainInfoComponent,
                MockPaymentInvoiceInfoComponent,
                MockRefundsComponent,
            ],
            providers: [
                {
                    provide: InvoiceDetailsService,
                    useFactory: () => instance(mockInvoiceDetailsService),
                },
                {
                    provide: PaymentsService,
                    useFactory: () => instance(mockPaymentsService),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentDetailsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.payment = generateMockPayment({
            invoiceID: 'test_invoiceID',
        });
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('ngOnChanges', () => {
        beforeEach(() => {
            component.payment = generateMockPayment({
                invoiceID: 'test_invoiceID',
            });
            fixture.detectChanges();
        });

        it('should initialize invoice service using payment invoice id', () => {
            component.ngOnChanges({
                payment: {
                    previousValue: null,
                    currentValue: component.payment,
                    isFirstChange(): boolean {
                        return false;
                    },
                    firstChange: false,
                },
            });

            verify(mockInvoiceDetailsService.setInvoiceID('test_invoiceID')).once();
            expect().nothing();
        });

        it('should do nothing if payment was nil', () => {
            component.ngOnChanges({
                payment: {
                    previousValue: component.payment,
                    currentValue: null,
                    isFirstChange(): boolean {
                        return false;
                    },
                    firstChange: false,
                },
            });

            verify(mockInvoiceDetailsService.setInvoiceID('test_invoiceID')).never();
            expect().nothing();
        });
    });

    describe('updatePayment', () => {});
});
