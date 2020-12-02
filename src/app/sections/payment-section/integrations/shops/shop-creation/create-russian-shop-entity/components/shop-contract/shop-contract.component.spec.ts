import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopContractComponent } from './shop-contract.component';

describe('ShopContractComponent', () => {
    let component: ShopContractComponent;
    let fixture: ComponentFixture<ShopContractComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopContractComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopContractComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
