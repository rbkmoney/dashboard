import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { Subject } from 'rxjs';

import { DetailsItemModule } from '@dsh/components/layout';

import { ShopLocation } from '../../../../../../../../api-codegen/anapi/swagger-codegen';
import { Category } from '../../../../../../../../api-codegen/capi/swagger-codegen';
import { ShopItem } from '../../../../types/shop-item';
import { ShopBalanceModule } from '../../../shop-balance';
import { CategoryService } from '../../services/category/category.service';
import { ShopInfoComponent } from './shop-info.component';

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

class MockCategoryService {
    category$ = new Subject<Category>();

    updateID(categoryID: number) {
        this.category$.next({
            categoryID,
            name: 'Mock Category',
        });
    }
}

describe('ShopInfoComponent', () => {
    let component: ShopInfoComponent;
    let fixture: ComponentFixture<ShopInfoComponent>;
    let mockCategoryService: MockCategoryService;

    beforeEach(async(() => {
        mockCategoryService = new MockCategoryService();

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({
                    en: {
                        shops: {
                            panel: {
                                name: 'PanelName',
                                url: 'PanelUrl',
                                balance: 'PanelBalance',
                                createdAt: 'PanelCreatedAt',
                                category: 'PanelCategory',
                            },
                        },
                    },
                }),
                FlexLayoutModule,
                DetailsItemModule,
                ShopBalanceModule,
            ],
            declarations: [ShopInfoComponent],
            providers: [
                {
                    provide: CategoryService,
                    useValue: mockCategoryService,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopInfoComponent);
        component = fixture.componentInstance;

        component.shop = mockShop;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
