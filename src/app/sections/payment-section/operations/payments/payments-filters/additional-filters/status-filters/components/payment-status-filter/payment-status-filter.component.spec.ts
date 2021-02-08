import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl } from '@ngneat/reactive-forms';

import { InlineShowAllToggleModule } from '@dsh/app/shared/components/buttons/inline-show-all-toggle';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { PAYMENT_STATUSES_LIST } from '../../consts';
import { PaymentStatusFilterValue } from '../../types/payment-status-filter-value';
import { PaymentStatusFilterComponent } from './payment-status-filter.component';

describe('StatusFilterComponent', () => {
    let component: PaymentStatusFilterComponent;
    let fixture: ComponentFixture<PaymentStatusFilterComponent>;

    async function createComponent() {
        await TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                MatRadioModule,
                InlineShowAllToggleModule,
                ReactiveFormsModule,
                MatIconTestingModule,
            ],
            declarations: [PaymentStatusFilterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentStatusFilterComponent);
        component = fixture.componentInstance;
    }

    beforeEach(async () => {
        await createComponent();
    });

    describe('creation', () => {
        it('should create', async () => {
            component.control = new FormControl<PaymentStatusFilterValue>(null);

            fixture.detectChanges();

            expect(component).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        it('should init availableStatuses using default slice offset', () => {
            component.control = new FormControl<PaymentStatusFilterValue>(null);

            fixture.detectChanges();

            expect(component.availableStatuses).toEqual(PAYMENT_STATUSES_LIST.slice(0, 2));
        });

        it('should init availableStatuses using default slice offset regardless selected item position in original list', () => {
            component.control = new FormControl<PaymentStatusFilterValue>(PAYMENT_STATUSES_LIST[3]);

            fixture.detectChanges();

            expect(component.availableStatuses).toEqual(PAYMENT_STATUSES_LIST.slice(0, 2));
        });
    });

    describe('toggleStatusesVisibility', () => {
        beforeEach(() => {
            component.control = new FormControl<PaymentStatusFilterValue>(null);
            fixture.detectChanges();
        });

        it('should update availableStatuses using full original list', () => {
            component.toggleStatusesVisibility();

            expect(component.availableStatuses).toEqual(PAYMENT_STATUSES_LIST.slice());
        });

        it('should update isAllStatusesVisible to true when openening', () => {
            component.toggleStatusesVisibility();

            expect(component.isAllStatusesVisible).toBe(true);
        });

        it('should hide some elements from original list if list was opened', () => {
            component.toggleStatusesVisibility();
            component.toggleStatusesVisibility();

            expect(component.availableStatuses).toEqual(PAYMENT_STATUSES_LIST.slice(0, 2));
        });

        it('should update isAllStatusesVisible to false when hiding', () => {
            component.toggleStatusesVisibility();
            component.toggleStatusesVisibility();

            expect(component.isAllStatusesVisible).toBe(false);
        });
    });
});
