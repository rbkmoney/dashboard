import { Component, DebugElement } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';

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
import { getDebugItemFromArray } from '../../get-debug-item-from-array';

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

@Component({
    template: '<dsh-refund-item [refund]="refund"></dsh-refund-item>'
})
class TestRefundItemComponent {
    refund = dummyRefund;
}

describe('RefundItemComponent', () => {
    let fixture: ComponentFixture<TestRefundItemComponent>;
    let items: DebugElement[];

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
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } }
            ]
        });

        fixture = TestBed.createComponent(TestRefundItemComponent);
        fixture.detectChanges();
        items = fixture.debugElement.queryAll(By.directive(DetailsItemComponent));
    });

    it('should create component', () => {
        const component = fixture.debugElement.query(By.directive(RefundItemComponent)).nativeElement;
        expect(component).toBeTruthy();
    });

    it('should show amount', () => {
        const amount = getDebugItemFromArray(items, 'amount');
        expect(amount.nativeElement.innerHTML).toContain('10.00');
    });

    it('should show reason', () => {
        const product = getDebugItemFromArray(items, 'reason');
        expect(product.nativeElement.innerHTML).toContain('test reason');
    });
});
