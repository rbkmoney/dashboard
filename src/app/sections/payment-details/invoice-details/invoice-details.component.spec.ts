import { Component, DebugElement } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { StatusDetailsItemComponent } from '../status-details-item';
import { LocalePipe } from '../../../locale/locale.pipe';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsService } from './invoice-details.service';
import { Invoice } from '../../../api-codegen/capi/swagger-codegen';
import { CardModule } from '../../../layout/card';
import { LocaleDictionaryService } from '../../../locale/locale-dictionary';
import { DetailsItemComponent } from '../details-item';
import { FromMinorPipe } from '../../../view-utils';
import { StatusComponent } from '../../../status';
import { InvoiceSearchService } from '../../../api/search';
import { LAYOUT_GAP } from '../../constants';
import { getDebugItemFromArray } from '../get-debug-item-from-array';

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

@Component({
    template: '<dsh-invoice-details invoiceID="test"></dsh-invoice-details>'
})
class TestInvoiceDetailsComponent {}

describe('InvoiceDetailsComponent', () => {
    let fixture: ComponentFixture<TestInvoiceDetailsComponent>;
    let items: DebugElement[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, MatIconModule, CardModule],
            declarations: [
                InvoiceDetailsComponent,
                TestInvoiceDetailsComponent,
                LocalePipe,
                StatusDetailsItemComponent,
                DetailsItemComponent,
                FromMinorPipe,
                StatusComponent
            ],
            providers: [
                InvoiceDetailsService,
                { provide: LAYOUT_GAP, useValue: '20px' },
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } },
                {
                    provide: InvoiceSearchService,
                    useValue: { getInvoiceByDuration: (id: string) => of({ ...dummyInvoice, id }) }
                }
            ]
        });

        fixture = TestBed.createComponent(TestInvoiceDetailsComponent);
        fixture.detectChanges();
        items = fixture.debugElement.queryAll(By.directive(InvoiceDetailsComponent));
    });

    it('should create component', () => {
        const component = fixture.debugElement.query(By.directive(InvoiceDetailsComponent)).nativeElement;
        expect(component).toBeTruthy();
    });

    it('should show amount', () => {
        const amount = getDebugItemFromArray(items, 'amount');
        expect(amount.nativeElement.innerHTML).toContain('10.00');
    });

    it('should show product', () => {
        const product = getDebugItemFromArray(items, 'product');
        expect(product.nativeElement.innerHTML).toContain('test product');
    });
});
