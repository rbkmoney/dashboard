import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { PaymentStatusFilterComponent } from './payment-status-filter.component';
import { PaymentStatusFilterValue } from './types/payment-status-filter-value';

@Component({
    selector: 'dsh-payment-status-filter',
    template: '',
})
class MockPaymentStatusFilterComponent {
    @Input() control: FormControl<PaymentStatusFilterValue>;
}

describe('StatusFilterComponent', () => {
    let component: PaymentStatusFilterComponent;
    let fixture: ComponentFixture<PaymentStatusFilterComponent>;

    async function createComponent() {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            declarations: [PaymentStatusFilterComponent, MockPaymentStatusFilterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentStatusFilterComponent);
        component = fixture.componentInstance;
    }

    beforeEach(async () => {
        await createComponent();
    });

    describe('creation', () => {
        it('should create', () => {
            component.control = new FormGroup<StatusFilters>({
                paymentStatus: new FormControl<PaymentStatusFilterValue>(),
            });

            fixture.detectChanges();

            expect(component).toBeTruthy();
        });
    });

    describe('form', () => {
        it('should have statusControl property if form was provided', () => {
            expect(component.statusControl).toBeFalsy();

            component.control = new FormGroup<StatusFilters>({
                paymentStatus: new FormControl<PaymentStatusFilterValue>(),
            });

            fixture.detectChanges();

            expect(component.statusControl).toBeTruthy();
        });

        it('should set statusControl property using provided form', () => {
            expect(component.statusControl).toBeFalsy();
            const statusControl = new FormControl<PaymentStatusFilterValue>();

            component.control = new FormGroup<StatusFilters>({
                paymentStatus: statusControl,
            });

            fixture.detectChanges();

            expect(component.statusControl).toEqual(statusControl);
        });
    });
});
