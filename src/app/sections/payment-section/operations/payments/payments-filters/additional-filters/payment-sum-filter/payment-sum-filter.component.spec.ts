import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { FormatInputModule } from '@dsh/components/form-controls';

import { PaymentSumFilterComponent } from './payment-sum-filter.component';
import { PaymentSumFilterForm } from './types/payment-sum-filter-form';

describe('PaymentSumComponent', () => {
    let component: PaymentSumFilterComponent;
    let fixture: ComponentFixture<PaymentSumFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                getTranslocoModule(),
                MatFormFieldModule,
                ReactiveFormsModule,
                FormatInputModule,
                FlexLayoutModule,
            ],
            declarations: [PaymentSumFilterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentSumFilterComponent);
        component = fixture.componentInstance;
        component.formControl = new FormGroup<PaymentSumFilterForm>({
            paymentAmountFrom: new FormControl<number>(),
            paymentAmountTo: new FormControl<number>(),
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
