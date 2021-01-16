import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup } from '@ngneat/reactive-forms';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { InternationalShopFormControllerService } from '../../services/international-shop-form-controller/international-shop-form-controller.service';
import { createMockPayoutToolForm } from '../../tests/create-mock-payout-tool-form';
import { createMockShopForm } from '../../tests/create-mock-shop-form';
import { InternationalBankAccountFormValue } from '../../types/international-bank-account-form-value';
import { ShopFormComponent } from './shop-form.component';

@Component({
    selector: 'dsh-payout-tool-form',
    template: '',
})
class MockPayoutToolFormComponent {
    @Input() form: FormGroup;
}

describe('ShopFormComponent', () => {
    let component: ShopFormComponent;
    let fixture: ComponentFixture<ShopFormComponent>;
    let mockInternationalShopFormControllerService: InternationalShopFormControllerService;

    beforeEach(() => {
        mockInternationalShopFormControllerService = mock(InternationalShopFormControllerService);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                NoopAnimationsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatCheckboxModule,
                MatDividerModule,
            ],
            declarations: [ShopFormComponent, MockPayoutToolFormComponent],
            providers: [
                {
                    provide: InternationalShopFormControllerService,
                    useFactory: () => instance(mockInternationalShopFormControllerService),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.form = createMockShopForm();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('payoutTool', () => {
        it('should return payoutTool control', () => {
            const mockPayoutTool = createMockPayoutToolForm();
            const form = createMockShopForm({
                payoutTool: mockPayoutTool,
            });

            when(mockInternationalShopFormControllerService.getPayoutTool(form)).thenReturn(
                form.controls.payoutTool as FormGroup<InternationalBankAccountFormValue>
            );

            component.form = form;

            fixture.detectChanges();

            expect(component.payoutTool).toEqual(
                form.controls.payoutTool as FormGroup<InternationalBankAccountFormValue>
            ); // controls returns abstract control with right type
        });
    });

    describe('correspondentPayoutTool', () => {
        it('should return correspondentPayoutTool control', () => {
            const mockCorrespondentPayoutTool = createMockPayoutToolForm();
            const form = createMockShopForm({
                correspondentPayoutTool: mockCorrespondentPayoutTool,
            });

            when(mockInternationalShopFormControllerService.getCorrespondentPayoutTool(form)).thenReturn(
                form.controls.correspondentPayoutTool as FormGroup<InternationalBankAccountFormValue>
            );

            component.form = form;

            fixture.detectChanges();

            expect(component.correspondentPayoutTool).toEqual(
                form.controls.correspondentPayoutTool as FormGroup<InternationalBankAccountFormValue>
            );
        });
    });

    describe('onCorrespondentAccountChange', () => {
        const form = createMockShopForm();

        beforeEach(() => {
            when(mockInternationalShopFormControllerService.addCorrespondentPayoutTool(deepEqual(form))).thenReturn();
            when(
                mockInternationalShopFormControllerService.removeCorrespondentPayoutTool(deepEqual(form))
            ).thenReturn();
        });

        beforeEach(() => {
            component.form = form;
            fixture.detectChanges();
        });

        it('should add correspondentPayoutTool if changed to true', () => {
            component.onCorrespondentAccountChange(true);
            verify(mockInternationalShopFormControllerService.addCorrespondentPayoutTool(deepEqual(form))).once();
            expect().nothing();
        });

        it('should remove correspondentPayoutTool if changed to false', () => {
            component.onCorrespondentAccountChange(false);
            verify(mockInternationalShopFormControllerService.removeCorrespondentPayoutTool(deepEqual(form))).once();
            expect().nothing();
        });

        it('should update hasCorrespondentAccount value', () => {
            component.onCorrespondentAccountChange(true);

            expect(component.hasCorrespondentAccount).toBe(true);

            component.onCorrespondentAccountChange(false);

            expect(component.hasCorrespondentAccount).toBe(false);
        });
    });
});
