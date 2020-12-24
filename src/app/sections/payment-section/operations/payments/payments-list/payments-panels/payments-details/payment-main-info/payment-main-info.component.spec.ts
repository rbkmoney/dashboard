import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMainInfoComponent } from './payment-main-info.component';

xdescribe('PaymentMainInfoComponent', () => {
    let component: PaymentMainInfoComponent;
    let fixture: ComponentFixture<PaymentMainInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentMainInfoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentMainInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
