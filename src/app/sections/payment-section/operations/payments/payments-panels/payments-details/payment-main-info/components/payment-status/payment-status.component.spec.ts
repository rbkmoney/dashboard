import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatus } from '@dsh/api-codegen/capi';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { StatusColor as Color } from '../../../../../../../../../theme-manager';
import { MockDetailsItemModule } from '../../../../../tests/mock-details-item-component';
import { ChargeAmountComponent } from '../charge-amount/charge-amount.component';
import { PaymentStatusComponent } from './payment-status.component';

@Component({
    selector: 'dsh-status',
    template: '',
})
class MockStatusComponent {
    @Input() color;
}

describe('PaymentDetailStatusComponent', () => {
    let component: PaymentStatusComponent;
    let fixture: ComponentFixture<PaymentStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), MockDetailsItemModule],
            declarations: [PaymentStatusComponent, MockStatusComponent],
        })
            .overrideComponent(ChargeAmountComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnChanges', () => {
        it('should not update status properties', () => {
            component.status = null;

            component.ngOnChanges({
                status: {
                    previousValue: null,
                    currentValue: null,
                    firstChange: false,
                    isFirstChange(): boolean {
                        return false;
                    },
                },
            });

            expect(component.paymentColor).toBeUndefined();
            expect(component.invoiceStatus).toBeUndefined();
        });

        it('should update status properties', () => {
            component.status = PaymentStatus.StatusEnum.Pending;

            component.ngOnChanges({
                status: {
                    previousValue: null,
                    currentValue: component.status,
                    firstChange: false,
                    isFirstChange(): boolean {
                        return false;
                    },
                },
            });

            expect(component.paymentColor).toBe(Color.Pending);
            expect(component.invoiceStatus).toBe('pending');
        });
    });
});
