import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSumFilterComponent } from './payment-sum-filter.component';

describe('PaymentSumComponent', () => {
    let component: PaymentSumFilterComponent;
    let fixture: ComponentFixture<PaymentSumFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PaymentSumFilterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentSumFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
