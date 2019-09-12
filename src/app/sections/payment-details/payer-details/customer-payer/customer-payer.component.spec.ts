import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomerPayer } from '../../../../api-codegen/capi/swagger-codegen';
import { LocaleDictionaryService } from '../../../../locale/locale-dictionary';
import { CustomerPayerComponent } from './customer-payer.component';
import { LocalePipe } from '../../../../locale/locale.pipe';
import { DetailsItemComponent } from '../../details-item';

@Component({
    template: '<dsh-customer-payer [customerPayer]="customerPayer"></dsh-customer-payer>'
})
class TestCustomerPayerComponent {
    customerPayer: CustomerPayer = {
        payerType: 'CustomerPayer',
        customerID: 'test'
    };
}

describe('CustomerPayerComponent', () => {
    let component: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule],
            declarations: [CustomerPayerComponent, TestCustomerPayerComponent, LocalePipe, DetailsItemComponent],
            providers: [{ provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } }]
        });

        const fixture = TestBed.createComponent(TestCustomerPayerComponent);
        fixture.detectChanges();
        component = fixture.nativeElement.querySelector('dsh-customer-payer');
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should show customer id', () => {
        expect(component.innerHTML).toContain('test');
    });
});
