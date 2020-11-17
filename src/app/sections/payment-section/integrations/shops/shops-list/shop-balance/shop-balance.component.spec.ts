import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBalanceComponent } from './shop-balance.component';

describe('ShopBalanceComponent', () => {
    let component: ShopBalanceComponent;
    let fixture: ComponentFixture<ShopBalanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopBalanceComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopBalanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
