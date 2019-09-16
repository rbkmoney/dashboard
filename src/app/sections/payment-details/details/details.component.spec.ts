import { APP_INITIALIZER, Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';

import { PayerType } from '../payer-details';
import {
    CustomerPayer,
    PaymentFlowInstant,
    PaymentSearchResult,
    PaymentStatus
} from '../../../api-codegen/capi/swagger-codegen';
import { StatusModule } from '../../../status';
import { ViewUtilsModule } from '../../../view-utils';
import { Language, LanguageService, LocaleDictionaryService, LocaleModule } from '../../../locale';
import { CardComponent, CardModule } from '../../../layout/card';
import { DetailsComponent } from './details.component';
import { DetailsItemComponent } from '../details-item';
import { StatusDetailsItemComponent } from '../status-details-item';
import { LAYOUT_GAP } from '../../constants';
import { ConfigService } from '../../../config';
import { initializer } from '../../../initializer';
import { getDebugItemFromArray } from '../get-debug-item-from-array';

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
        createdAt: '2007-01-01T12:12:12Z' as any,
        amount: 1000,
        currency: 'RUB',
        payer: this.dummyPayer,
        flow: this.dummyFlow
    };
}

describe('TestDetailsComponent', () => {
    let fixture: ComponentFixture<TestDetailsComponent>;
    let items: DebugElement[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, CardModule, LocaleModule, ViewUtilsModule, StatusModule],
            declarations: [DetailsComponent, DetailsItemComponent, StatusDetailsItemComponent, TestDetailsComponent],
            providers: [
                { provide: KeycloakService, useValue: { init: () => '' } },
                { provide: ConfigService, useValue: { init: () => '' } },
                { provide: LAYOUT_GAP, useValue: '20px' },
                {
                    provide: LocaleDictionaryService,
                    useValue: { init: () => '', mapDictionaryKey: value => value, toLowerCase: value => value }
                },
                { provide: LanguageService, useValue: { active: Language.ru } },
                {
                    provide: APP_INITIALIZER,
                    useFactory: initializer,
                    deps: [ConfigService, KeycloakService, LocaleDictionaryService],
                    multi: true
                }
            ]
        });

        fixture = TestBed.createComponent(TestDetailsComponent);
        fixture.detectChanges();
        items = fixture.debugElement.queryAll(By.directive(DetailsItemComponent));
    });

    it('should create component', () => {
        const component = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(component).toBeTruthy();
    });

    it('should show status', () => {
        const status = fixture.debugElement.query(By.directive(StatusDetailsItemComponent)).nativeElement;
        expect(status).toBeTruthy();
    });

    it('should show createdAt', () => {
        const createdAt = getDebugItemFromArray(items, 'createdAt');
        expect(createdAt.nativeElement.innerHTML).toContain('01 January 2007, 15:12');
    });

    it('should show amount', () => {
        const amount = getDebugItemFromArray(items, 'amount');
        expect(amount.nativeElement.innerHTML).toContain('10.00');
    });

    it('should show chargeAmount', () => {
        const chargeAmount = getDebugItemFromArray(items, 'chargeAmount');
        expect(chargeAmount.nativeElement.innerHTML).toContain('10.00');
    });
});
