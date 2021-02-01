import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusFilterComponent } from './payment-status-filter.component';

describe('StatusFilterComponent', () => {
    let component: PaymentStatusFilterComponent;
    let fixture: ComponentFixture<PaymentStatusFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentStatusFilterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentStatusFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
