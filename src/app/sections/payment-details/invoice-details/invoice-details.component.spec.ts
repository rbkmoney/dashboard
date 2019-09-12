import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { of } from 'rxjs';

import { LocalePipe } from '../../../locale/locale.pipe';
import { LocaleDictionaryService } from '../../../locale/locale-dictionary';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsService } from './invoice-details.service';
import { Invoice } from '../../../api-codegen/capi/swagger-codegen';
import { CardModule } from '../../../layout/card';
import { StatusDetailsItemComponent } from '../status-details-item';
import { DetailsItemComponent } from '../details-item';
import { FromMinorPipe } from '../../../view-utils';
import { StatusComponent } from '../../../status';
import { InvoiceSearchService } from '../../../api/search';
import { LAYOUT_GAP } from '../../constants';

const dummyInvoice: Invoice = {
    id: '',
    status: 'paid',
    createdAt: new Date(),
    shopID: 'test',
    dueDate: new Date(),
    amount: 1000,
    currency: 'RUB',
    product: 'test product',
    metadata: {}
};

describe('InvoiceDetailsComponent', () => {
    let component: HTMLElement;

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

        const fixture = TestBed.createComponent(TestInvoiceDetailsComponent);
        fixture.detectChanges();
        component = fixture.nativeElement.querySelector('dsh-invoice-details');
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should show amount', () => {
        const amount = component.querySelector('#amount');
        expect(amount.innerHTML).toContain('10.00');
    });

    it('should show product', () => {
        const product = component.querySelector('#product');
        expect(product.innerHTML).toContain('test product');
    });
});

@Component({
    template: '<dsh-invoice-details invoiceID="test"></dsh-invoice-details>'
})
class TestInvoiceDetailsComponent {}
