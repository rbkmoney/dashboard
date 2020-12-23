import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeAmountComponent } from './charge-amount.component';

xdescribe('ChargeAmountComponent', () => {
    let component: ChargeAmountComponent;
    let fixture: ComponentFixture<ChargeAmountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChargeAmountComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChargeAmountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
