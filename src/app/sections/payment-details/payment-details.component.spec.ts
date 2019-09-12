import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentDetailsService } from './payment-details.service';
import { SearchService } from '../../api-codegen/capi/swagger-codegen';
import { PaymentDetailsComponent } from './payment-details.component';
import { HeadlineComponent } from './headline';
import { DetailsComponent } from './details';
import {
    BankCardComponent,
    DigitalWalletComponent,
    PaymentTerminalComponent,
    PaymentToolComponent
} from './payment-tool';
import { CustomerPayerComponent, PayerDetailsComponent, PaymentResourcePayerComponent } from './payer-details';
import { HoldDetailsComponent } from './hold-details';
import { RecurrentDetailsComponent } from './recurrent-details';
import { InvoiceDetailsComponent } from './invoice-details';
import { ShopDetailsComponent, ShopLocationUrlComponent } from './shop-details';
import { MakeRecurrentComponent } from './make-recurrent';
import { RefundItemComponent, RefundsComponent } from './refunds';
import { LocaleModule } from '../../locale';
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
import { PaymentSearchService } from '../../api/search';

describe('PaymentDetailsComponent', () => {
    let injector: TestBed;

    let service: PaymentDetailsService;

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
                        params: of({ invoiceID: 'test', paymentID: '1' })
                    }
                },
                HttpHandler,
                HttpClient,
                SearchService,
                PaymentSearchService,
                PaymentDetailsService,
                { provide: LAYOUT_GAP, useValue: {} }
            ]
        });

        injector = getTestBed();
        service = injector.get(PaymentDetailsService);
    });

    it('should create component', () => {
        const component = TestBed.createComponent(PaymentDetailsComponent).componentInstance;

        expect(component).toBeDefined();
    });
});
