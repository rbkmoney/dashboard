import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { instance, mock } from 'ts-mockito';

import { Invoice, InvoiceStatusChanged } from '@dsh/api-codegen/capi';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { PaymentInvoiceInfoComponent } from './payment-invoice-info.component';

import StatusEnum = InvoiceStatusChanged.StatusEnum;

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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), MatIconModule],
            declarations: [PaymentInvoiceInfoComponent, MockInvoiceDetailsComponent],
            providers: [
                {
                    provide: Router,
                    useFactory: () => instance(mockRouter),
                },
            ],
        }).compileComponents();
    });

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
});
