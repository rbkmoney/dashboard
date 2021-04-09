import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { getTextContent } from '@dsh/app/shared/tests/get-text-content';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { generateMockPayment } from '../../../../../tests/generate-mock-payment';
import { MockDetailsItemModule } from '../../../../../tests/mock-details-item-component';
import { ChargeAmountComponent } from './charge-amount.component';

describe('ChargeAmountComponent', () => {
    let component: ChargeAmountComponent;
    let fixture: ComponentFixture<ChargeAmountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), MockDetailsItemModule, ToMajorModule],
            declarations: [ChargeAmountComponent],
        })
            .overrideComponent(ChargeAmountComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChargeAmountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should show charge amount using payment fee and amount', () => {
            component.payment = generateMockPayment({
                amount: 1000,
                fee: 200,
                currency: 'USD',
            });

            fixture.detectChanges();

            expect(getTextContent(fixture.debugElement.nativeElement)).toBe('$8.00');
        });
    });
});
