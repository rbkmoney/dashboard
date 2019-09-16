import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import moment from 'moment';

import {
    CustomerPayer,
    Invoice,
    PaymentFlowInstant,
    PaymentSearchResult,
    PaymentStatus
} from '../../api-codegen/capi/swagger-codegen';
import { PaymentDetailsComponent } from './payment-details.component';
import { HeadlineComponent } from './headline';
import { DetailsComponent } from './details';
import {
    BankCardComponent,
    DigitalWalletComponent,
    PaymentTerminalComponent,
    PaymentToolComponent
} from './payment-tool';
import {
    CustomerPayerComponent,
    PayerDetailsComponent,
    PayerType,
    PaymentResourcePayerComponent
} from './payer-details';
import { HoldDetailsComponent } from './hold-details';
import { RecurrentDetailsComponent } from './recurrent-details';
import { InvoiceDetailsComponent } from './invoice-details';
import { ShopDetailsComponent, ShopLocationUrlComponent } from './shop-details';
import { MakeRecurrentComponent } from './make-recurrent';
import { RefundItemComponent, RefundsComponent } from './refunds';
import { LocaleDictionaryService, LocaleModule } from '../../locale';
import { CardModule } from '../../layout/card';
import { ViewUtilsModule } from '../../view-utils';
import { DetailsItemComponent } from './details-item';
import { StatusDetailsItemComponent } from './status-details-item';
import { BankCardPipe } from './bank-card.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { AmountPipe } from './amount.pipe';
import { HumanizedDurationPipe } from '../../humanize-duration/humanized-duration.pipe';
import { StatusComponent } from '../../status';
import { LAYOUT_GAP } from '../constants';
import { InvoiceSearchService, PaymentSearchService, RefundSearchService } from '../../api/search';

const dummyPayer: CustomerPayer = {
    payerType: PayerType.CustomerPayer,
    customerID: 'testCustomerID'
};

const dummyFlow: PaymentFlowInstant = {
    type: 'PaymentFlowInstant'
};

const dummyPayment: PaymentSearchResult = {
    id: '100',
    status: PaymentStatus.StatusEnum.Pending,
    invoiceID: 'testInvoiceID',
    createdAt: moment().format() as any,
    amount: 1000,
    currency: 'RUB',
    payer: dummyPayer,
    flow: dummyFlow
};

const dummyInvoice: Invoice = {
    id: 'test',
    status: 'paid',
    createdAt: new Date(),
    shopID: 'test',
    dueDate: new Date(),
    amount: 1000,
    currency: 'RUB',
    product: 'test product',
    metadata: {}
};

describe('PaymentDetailsComponent', () => {
    let fixture: ComponentFixture<PaymentDetailsComponent>;
    let component: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, MatIconModule, LocaleModule, CardModule, ViewUtilsModule],
            declarations: [
                BankCardPipe,
                PhoneNumberPipe,
                AmountPipe,
                HumanizedDurationPipe,
                ShopLocationUrlComponent,
                StatusComponent,
                PaymentTerminalComponent,
                CustomerPayerComponent,
                PaymentResourcePayerComponent,
                PaymentDetailsComponent,
                HeadlineComponent,
                MakeRecurrentComponent,
                BankCardComponent,
                DigitalWalletComponent,
                RefundsComponent,
                RefundItemComponent,
                DetailsComponent,
                PaymentToolComponent,
                PayerDetailsComponent,
                HoldDetailsComponent,
                RecurrentDetailsComponent,
                InvoiceDetailsComponent,
                ShopDetailsComponent,
                DetailsItemComponent,
                StatusDetailsItemComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: {
                            pipe: () => of(dummyPayment)
                        }
                    }
                },
                { provide: Location, useValue: {} },
                { provide: PaymentSearchService, useValue: {} },
                { provide: RefundSearchService, useValue: {} },
                { provide: InvoiceSearchService, useValue: { getInvoiceByDuration: () => of(dummyInvoice) } },
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } },
                { provide: LAYOUT_GAP, useValue: '20px' }
            ]
        });

        fixture = TestBed.createComponent(PaymentDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.query(By.css('.dsh-payment-details'));
    });

    it('should create component', () => {
        expect(component.nativeElement).toBeTruthy();
    });

    it('should show headline', () => {
        const headline = component.query(By.directive(HeadlineComponent)).nativeElement;
        expect(headline).toBeTruthy();
    });

    it('should show details', () => {
        const details = component.query(By.directive(DetailsComponent)).nativeElement;
        expect(details).toBeTruthy();
    });

    it('should show payer details', () => {
        const payerDetails = component.query(By.directive(PayerDetailsComponent)).nativeElement;
        expect(payerDetails).toBeTruthy();
    });

    it('should show invoice details', () => {
        const invoiceDetails = component.query(By.directive(InvoiceDetailsComponent)).nativeElement;
        expect(invoiceDetails).toBeTruthy();
    });

    it('should show refunds', () => {
        const refunds = component.query(By.directive(RefundsComponent)).nativeElement;
        expect(refunds).toBeTruthy();
    });
});
