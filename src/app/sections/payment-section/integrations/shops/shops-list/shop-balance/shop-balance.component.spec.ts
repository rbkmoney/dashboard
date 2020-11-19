import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLocation } from '../../../../../../api-codegen/anapi/swagger-codegen';
import { ShopItem } from '../../models';
import { ShopBalanceComponent } from './shop-balance.component';

const mockShop: ShopItem = {
    id: 'mock',
    createdAt: new Date(),
    isBlocked: false,
    isSuspended: false,
    categoryID: 1,
    location: {
        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
        url: 'example.com',
    },
    details: {
        name: 'my name',
        description: 'some description',
    },
    contractID: 'contractID',
    payoutToolID: 'payoutToolID',
    scheduleID: 1,
    account: {
        currency: 'USD',
        guaranteeID: 2,
        settlementID: 2,
    },
    balance: {
        amount: 20,
        currency: 'USD',
    },
};

fdescribe('ShopBalanceComponent', () => {
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

        component.shop = mockShop;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
