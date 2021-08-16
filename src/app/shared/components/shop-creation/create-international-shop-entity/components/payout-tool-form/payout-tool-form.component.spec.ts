import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { createMockPayoutToolForm } from '../../tests/create-mock-payout-tool-form';
import { PayoutToolFormComponent } from './payout-tool-form.component';

describe('PayoutToolFormComponent', () => {
    let fixture: ComponentFixture<PayoutToolFormComponent>;
    let component: PayoutToolFormComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                NoopAnimationsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
            ],
            declarations: [PayoutToolFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PayoutToolFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.form = createMockPayoutToolForm();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
