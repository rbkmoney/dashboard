import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RefundItemComponent } from './refund-item.component';
import { RefundSearchResult, RefundStatus } from '../../../../api-codegen/capi/swagger-codegen';
import { CardModule } from '../../../../layout/card';
import { LocalePipe } from '../../../../locale/locale.pipe';
import { StatusDetailsItemComponent } from '../../status-details-item';
import { DetailsItemComponent } from '../../details-item';
import { StatusComponent } from '../../../../status';
import { LocaleDictionaryService } from '../../../../locale/locale-dictionary';
import { LAYOUT_GAP } from '../../../constants';
import { FromMinorPipe } from '../../../../view-utils';

const dummyRefund: RefundSearchResult = {
    id: '',
    paymentID: 'testPayment',
    invoiceID: 'testInvoice',
    status: RefundStatus.StatusEnum.Succeeded,
    createdAt: new Date(),
    amount: 1000,
    currency: 'RUB',
    reason: 'test reason'
};

describe('RefundItemComponent', () => {

    let component: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, MatIconModule, CardModule],
            declarations: [
                RefundItemComponent,
                TestRefundItemComponent,
                LocalePipe,
                StatusDetailsItemComponent,
                DetailsItemComponent,
                StatusComponent,
                FromMinorPipe
            ],
            providers: [
                { provide: LAYOUT_GAP, useValue: '20px' },
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: (value) => value } }
            ]
        });

        const fixture = TestBed.createComponent(TestRefundItemComponent);
        fixture.detectChanges();
        component = fixture.nativeElement.querySelector('dsh-refund-item');
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should show amount', () => {
        const amount = component.querySelector('#refundAmount');
        expect(amount.innerHTML).toContain('10.00');
    });

    it('should show reason', () => {
        const product = component.querySelector('#reason');
        expect(product.innerHTML).toContain('test reason');
    });

});

@Component({
    template: '<dsh-refund-item [refund]="refund"></dsh-refund-item>'
})
class TestRefundItemComponent {
    refund = dummyRefund;
}
