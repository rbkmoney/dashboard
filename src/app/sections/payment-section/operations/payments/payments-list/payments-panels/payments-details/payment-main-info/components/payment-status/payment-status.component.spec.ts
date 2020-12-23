import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusComponent } from './payment-status.component';

xdescribe('PaymentDetailStatusComponent', () => {
    let component: PaymentStatusComponent;
    let fixture: ComponentFixture<PaymentStatusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentStatusComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
