import { APP_INITIALIZER, Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TestBed } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import moment from 'moment';

import { PayerType } from '../payer-details';
import { CustomerPayer, PaymentFlowInstant, PaymentSearchResult } from '../../../api-codegen/capi/swagger-codegen';
import { PaymentStatus } from '../../../api-codegen/capi/swagger-codegen';
import { StatusModule } from '../../../status';
import { ViewUtilsModule } from '../../../view-utils';
import { Language, LanguageService, LocaleDictionaryService, LocaleModule } from '../../../locale';
import { CardModule } from '../../../layout/card';
import { DetailsComponent } from './details.component';
import { DetailsItemComponent } from '../details-item';
import { StatusDetailsItemComponent } from '../status-details-item';
import { LAYOUT_GAP } from '../../constants';
import { ConfigService } from '../../../config';
import { initializer } from '../../../initializer';

describe('TestDetailsComponent', () => {

    let component: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, CardModule, LocaleModule, ViewUtilsModule, StatusModule],
            declarations: [DetailsComponent, DetailsItemComponent, StatusDetailsItemComponent, TestDetailsComponent],
            providers: [
                { provide: KeycloakService, useValue: { init: () => '' } },
                { provide: ConfigService, useValue: { init: () => '' } },
                { provide: LAYOUT_GAP, useValue: '20px' },
                { provide: LocaleDictionaryService, useValue: { init: () => '', mapDictionaryKey: (value) => value, toLowerCase: (value) => value } },
                { provide: LanguageService, useValue: { active: Language.ru } },
                { provide: DatePipe, useValue: { transform: (value) => value } },
                {
                    provide: APP_INITIALIZER,
                    useFactory: initializer,
                    deps: [ConfigService, KeycloakService, LocaleDictionaryService],
                    multi: true
                }
            ]
        });

        const fixture = TestBed.createComponent(TestDetailsComponent);
        fixture.detectChanges();
        component = fixture.nativeElement.querySelector('dsh-card');
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should show status', () => {
        const status = component.querySelector('dsh-details-status-item');
        expect(status).toBeTruthy();
    });

    it('should show createdAt', () => {
        const createdAt = component.querySelector('#createdAt');
        expect(createdAt).toBeTruthy();
    });

    it('should show amount', () => {
        const amount = component.querySelector('#amount');
        expect(amount).toBeTruthy();
    });

    it('should show chargeAmount', () => {
        const chargeAmount = component.querySelector('#chargeAmount');
        expect(chargeAmount).toBeTruthy();
    });

});

@Component({
    template: '<dsh-details [payment]="dummyPayment"></dsh-details>'
})
class TestDetailsComponent {
    dummyPayer: CustomerPayer = {
        payerType: PayerType.CustomerPayer,
        customerID: 'testCustomerID'
    };

    dummyFlow: PaymentFlowInstant = {
        type: 'PaymentFlowInstant'
    };

    dummyPayment: PaymentSearchResult = {
        id: '100',
        status: PaymentStatus.StatusEnum.Pending,
        invoiceID: 'testInvoiceID',
        createdAt: moment().format() as any,
        amount: 1000,
        currency: 'RUB',
        payer: this.dummyPayer,
        flow: this.dummyFlow
    };
}
