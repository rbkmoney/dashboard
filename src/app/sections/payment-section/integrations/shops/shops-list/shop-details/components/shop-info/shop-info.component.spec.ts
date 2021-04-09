import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { getTestScheduler } from 'jasmine-marbles';
import { Observable, ReplaySubject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Category, ShopLocationUrl } from '@dsh/api-codegen/capi/swagger-codegen';
import { DetailsItemModule } from '@dsh/components/layout';

import { generateMockShopItem } from '../../../../tests/generate-shop-item';
import { ShopBalanceModule } from '../../../shop-balance';
import { CategoryService } from '../../services/category/category.service';
import { ShopInfoComponent } from './shop-info.component';

class MockCategoryService {
    category$: Observable<Category>;

    private _category$ = new ReplaySubject<Category>(1);

    constructor() {
        this.category$ = this._category$.pipe(delay(0, getTestScheduler()));
    }

    updateID(categoryID: number): void {
        this._category$.next({
            categoryID,
            name: 'Mock Category',
        });
    }
}

describe('ShopInfoComponent', () => {
    let component: ShopInfoComponent;
    let fixture: ComponentFixture<ShopInfoComponent>;
    let mockCategoryService: MockCategoryService;

    beforeEach(async () => {
        mockCategoryService = new MockCategoryService();

        await TestBed.configureTestingModule({
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
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopInfoComponent);
        component = fixture.componentInstance;

        component.shop = generateMockShopItem(1);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('shop', () => {
        it('should return inner shop value', () => {
            const shop = generateMockShopItem(15);
            component.shop = shop;

            expect(component.shop).toEqual(shop);
        });

        it('should update categoryID on every shop change', () => {
            const spyOnUpdateID = spyOn(mockCategoryService, 'updateID').and.callThrough();

            const shops = [generateMockShopItem(2), generateMockShopItem(3)];

            shops[0].categoryID = 250;
            shops[1].categoryID = 100500;

            component.shop = shops[0];
            expect(spyOnUpdateID).toHaveBeenCalledWith(250);

            component.shop = shops[1];
            expect(spyOnUpdateID).toHaveBeenCalledWith(100500);

            expect(spyOnUpdateID).toHaveBeenCalledTimes(2);
        });
    });

    describe('shopUrl', () => {
        it('should return empty balance symbol if shop item has no url', () => {
            const shop = generateMockShopItem(15);
            (shop.location as ShopLocationUrl).url = null;
            component.shop = shop;

            expect(component.shopUrl).toBe('--/--');
        });

        it('should return shop url if shop item has its own url', () => {
            const shop = generateMockShopItem(15);
            (shop.location as ShopLocationUrl).url = 'my_url.com';
            component.shop = shop;

            expect(component.shopUrl).toBe('my_url.com');
        });
    });
});
