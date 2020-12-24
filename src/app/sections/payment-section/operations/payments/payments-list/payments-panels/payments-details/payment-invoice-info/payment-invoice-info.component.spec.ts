import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import StatusEnum = InvoiceStatusChanged.StatusEnum;
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { deepEqual, instance, mock, verify } from 'ts-mockito';

import { Invoice, InvoiceStatusChanged } from '@dsh/api-codegen/capi';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { PaymentInvoiceInfoComponent } from './payment-invoice-info.component';

@Component({
    selector: 'dsh-invoice-details',
    template: '',
})
class MockInvoiceDetailsComponent {
    @Input() invoice: Invoice;
}

describe('PaymentInvoiceInfoComponent', () => {
    let component: PaymentInvoiceInfoComponent;
    let fixture: ComponentFixture<PaymentInvoiceInfoComponent>;
    let mockRouter: Router;

    beforeEach(() => {
        mockRouter = mock(Router);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [getTranslocoModule(), MatIconModule],
            declarations: [PaymentInvoiceInfoComponent, MockInvoiceDetailsComponent],
            providers: [
                {
                    provide: Router,
                    useFactory: () => instance(mockRouter),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentInvoiceInfoComponent);
        component = fixture.componentInstance;
        component.invoice = {
            id: 'mine_id_1',
            shopID: 'id',
            createdAt: new Date(),
            amount: 2,
            currency: 'usd',
            product: 'mine',
            metadata: null,
            dueDate: new Date(),
            status: StatusEnum.Unpaid,
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('navToInvoiceDetails', () => {
        it('should navigate to invoice page using id', () => {
            const invoices = [
                {
                    id: 'mine_id_1',
                    shopID: 'id',
                    createdAt: new Date(),
                    amount: 2,
                    currency: 'usd',
                    product: 'mine',
                    metadata: null,
                    dueDate: new Date(),
                    status: StatusEnum.Unpaid,
                },
                {
                    id: 'mine_id_2',
                    shopID: 'id',
                    createdAt: new Date(),
                    amount: 2,
                    currency: 'usd',
                    product: 'mine',
                    metadata: null,
                    dueDate: new Date(),
                    status: StatusEnum.Unpaid,
                },
            ];

            component.navToInvoiceDetails(invoices[0]);
            component.navToInvoiceDetails(invoices[1]);

            verify(mockRouter.navigate(deepEqual(['invoice', 'mine_id_1']))).once();
            verify(mockRouter.navigate(deepEqual(['invoice', 'mine_id_2']))).once();
            expect().nothing();
        });
    });
});
