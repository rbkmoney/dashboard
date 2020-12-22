import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailStatusComponent } from './payment-detail-status.component';

describe('PaymentDetailStatusComponent', () => {
    let component: PaymentDetailStatusComponent;
    let fixture: ComponentFixture<PaymentDetailStatusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentDetailStatusComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentDetailStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
