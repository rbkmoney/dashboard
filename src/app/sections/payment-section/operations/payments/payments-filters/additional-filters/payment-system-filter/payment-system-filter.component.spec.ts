import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { FormControl } from '@ngneat/reactive-forms';

import { BankCardPaymentSystem } from '@dsh/api-codegen/anapi';
import { ExpandableRadioGroupModule } from '@dsh/app/shared/components/radio-buttons/expandable-radio-group';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { PaymentSystemFilterComponent } from './payment-system-filter.component';

describe('PaymentSystemFilterComponent', () => {
    let component: PaymentSystemFilterComponent;
    let fixture: ComponentFixture<PaymentSystemFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), ExpandableRadioGroupModule, MatIconTestingModule],
            declarations: [PaymentSystemFilterComponent, MatIcon],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentSystemFilterComponent);

        component = fixture.componentInstance;
        component.formControl = new FormControl<BankCardPaymentSystem>(null);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
