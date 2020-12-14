import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsFiltersComponent } from './payments-filters.component';

describe('PaymentsFiltersComponent', () => {
    let component: PaymentsFiltersComponent;
    let fixture: ComponentFixture<PaymentsFiltersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentsFiltersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentsFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
