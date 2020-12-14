import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailInfoComponent } from './payment-detail-info.component';

describe('PaymentDetailInfoComponent', () => {
    let component: PaymentDetailInfoComponent;
    let fixture: ComponentFixture<PaymentDetailInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentDetailInfoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentDetailInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
