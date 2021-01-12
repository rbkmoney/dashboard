import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { instance, mock, verify } from 'ts-mockito';

import { Invoice } from '@dsh/api-codegen/capi';

import { generateMockPayment } from '../../tests/generate-mock-payment';
import { Payment } from '../../types/payment';
import { PaymentDetailsComponent } from './payment-details.component';
import { InvoiceDetailsService } from './services/invoice-details/invoice-details.service';

@Component({
    selector: 'dsh-payment-main-info',
    template: '',
})
class MockPaymentMainInfoComponent {
    @Input() payment: Payment;
}

@Component({
    selector: 'dsh-payment-invoice-info',
    template: '',
})
class MockPaymentInvoiceInfoComponent {
    @Input() invoice: Invoice;
}

xdescribe('PaymentDetailsComponent', () => {
    let component: PaymentDetailsComponent;
    let fixture: ComponentFixture<PaymentDetailsComponent>;
    let mockInvoiceDetailsService: InvoiceDetailsService;

    beforeEach(() => {
        mockInvoiceDetailsService = mock(InvoiceDetailsService);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatDividerModule],
            declarations: [PaymentDetailsComponent, MockPaymentMainInfoComponent, MockPaymentInvoiceInfoComponent],
            providers: [
                {
                    provide: InvoiceDetailsService,
                    useFactory: () => instance(mockInvoiceDetailsService),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
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
});
