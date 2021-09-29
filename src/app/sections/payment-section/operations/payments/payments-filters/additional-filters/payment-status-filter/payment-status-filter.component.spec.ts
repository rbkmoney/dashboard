import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { FormControl } from '@ngneat/reactive-forms';

import { PaymentStatus } from '@dsh/api-codegen/anapi';
import { ExpandableRadioGroupModule } from '@dsh/app/shared/components/radio-buttons/expandable-radio-group';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { PaymentStatusFilterComponent } from './payment-status-filter.component';

describe('StatusFilterComponent', () => {
    let component: PaymentStatusFilterComponent;
    let fixture: ComponentFixture<PaymentStatusFilterComponent>;

    async function createComponent() {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), ExpandableRadioGroupModule, MatIconTestingModule],
            declarations: [PaymentStatusFilterComponent, MatIcon],
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentStatusFilterComponent);
        component = fixture.componentInstance;
    }

    beforeEach(async () => {
        await createComponent();
    });

    describe('creation', () => {
        it('should create', () => {
            component.formControl = new FormControl<PaymentStatus.StatusEnum>();

            fixture.detectChanges();

            expect(component).toBeTruthy();
        });
    });
});
