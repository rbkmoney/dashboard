import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { LAYOUT_GAP } from '../../constants';
import { LocaleDictionaryService } from '../../../locale/locale-dictionary';
import { FromMinorPipe } from '../../../view-utils';
import { StatusComponent } from '../../../status';
import { DetailsItemComponent } from '../details-item';
import { StatusDetailsItemComponent } from '../status-details-item';
import { LocalePipe } from '../../../locale/locale.pipe';
import { CardModule } from '../../../layout/card';
import { RefundSearchResult, RefundStatus } from '../../../api-codegen/capi/swagger-codegen';
import { RefundsComponent } from './refunds.component';
import { RefundItemComponent } from './refund-item';
import { RefundSearchService } from '../../../api/search';
import { RefundsService } from './refunds.service';

const dummyRefund: RefundSearchResult = {
    id: 'test',
    paymentID: 'testPayment',
    invoiceID: 'testInvoice',
    status: RefundStatus.StatusEnum.Succeeded,
    createdAt: new Date(),
    amount: 1000,
    currency: 'RUB',
    reason: 'test reason'
};

@Component({
    template: '<dsh-refunds [invoiceID]="invoiceID" [paymentID]="paymentID"></dsh-refunds>'
})
class TestRefundsComponent {
    invoiceID = 'testInvoice';
    paymentID = 'testPayment';
}

describe('RefundsComponent', () => {
    let component: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, MatIconModule, CardModule],
            declarations: [
                RefundsComponent,
                RefundItemComponent,
                TestRefundsComponent,
                LocalePipe,
                StatusDetailsItemComponent,
                DetailsItemComponent,
                StatusComponent,
                FromMinorPipe
            ],
            providers: [
                RefundsService,
                { provide: LAYOUT_GAP, useValue: '20px' },
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } },
                {
                    provide: RefundSearchService,
                    useValue: { searchRefundsByDuration: () => of([dummyRefund, dummyRefund, dummyRefund]) }
                }
            ]
        });

        const fixture = TestBed.createComponent(TestRefundsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.query(By.directive(RefundsComponent)).nativeElement;
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });
});
