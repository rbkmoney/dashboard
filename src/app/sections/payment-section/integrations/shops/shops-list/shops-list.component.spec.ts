import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, ExpandPanelModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ToMajorModule } from '../../../../../to-major';
import { FetchShopsService } from '../services/fetch-shops/fetch-shops.service';
import { generateMockShopId } from '../tests/generate-mock-shop-id';
import { generateMockShopsItemList } from '../tests/generate-mock-shops-item-list';
import { generateMockShopsList } from '../tests/generate-mock-shops-list';
import { ShopRowHeaderComponent } from './components/shop-row-header/shop-row-header.component';
import { ShopRowComponent } from './components/shop-row/shop-row.component';
import { ShopsExpandedIdManagerService } from './services/shops-expanded-id-manager/shops-expanded-id-manager.service';
import { ShopBalanceModule } from './shop-balance';
import { ShopDetailsModule } from './shop-details';
import { ShopsListComponent } from './shops-list.component';
import { MockActivatedRoute } from './tests/mock-activated-route';
import { MockFetchShops } from './tests/mock-fetch-shops';

const translationConfig = {
    en: {
        shops: {
            panel: {
                name: 'Name',
                balance: 'Balance',
            },
        },
    },
};

describe('ShopsListComponent', () => {
    let component: ShopsListComponent;
    let fixture: ComponentFixture<ShopsListComponent>;
    let expandedIdManager: ShopsExpandedIdManagerService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LastUpdatedModule,
                AccordionModule,
                CardModule,
                RowModule,
                ToMajorModule,
                ShowMorePanelModule,
                EmptySearchResultModule,
                SpinnerModule,
                ShopDetailsModule,
                FlexLayoutModule,
                TranslocoTestingModule.withLangs(translationConfig, {
                    availableLangs: ['en'],
                    defaultLang: 'en',
                }),
                ShopBalanceModule,
                ExpandPanelModule,
                RouterTestingModule.withRoutes([]),
            ],
            declarations: [ShopsListComponent, ShopRowHeaderComponent, ShopRowComponent],
            providers: [
                ShopsExpandedIdManagerService,
                {
                    provide: ActivatedRoute,
                    useFactory: () => new MockActivatedRoute(generateMockShopId(3)),
                },
                {
                    provide: FetchShopsService,
                    useFactory: () => new MockFetchShops(generateMockShopsList(6)),
                },
            ],
        })
            .overrideComponent(ShopsListComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopsListComponent);
        component = fixture.componentInstance;
        expandedIdManager = TestBed.inject(ShopsExpandedIdManagerService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('isListExist', () => {
        it('should be true if list was provided', () => {
            component.shopList = [];

            expect(component.isListExist).toBe(true);
        });

        it('should be false if list was not provided', () => {
            expect(component.isListExist).toBe(false);
        });
    });

    describe('isEmptyList', () => {
        it('should be true if list is empty', () => {
            component.shopList = [];

            expect(component.isEmptyList).toBe(true);
        });

        it('should be false if list contains at least one element', () => {
            component.shopList = generateMockShopsItemList(1);

            expect(component.isEmptyList).toBe(false);

            component.shopList = generateMockShopsItemList(100500);

            expect(component.isEmptyList).toBe(false);
        });
    });

    describe('refreshList', () => {
        it('should emit refresh output', () => {
            const spyOnOutput = spyOn(component.refresh, 'emit').and.callThrough();

            component.refreshList();

            expect(spyOnOutput).toHaveBeenCalledTimes(1);
        });
    });

    describe('showMoreElements', () => {
        it('should emit showMore output', () => {
            const spyOnOutput = spyOn(component.showMore, 'emit').and.callThrough();

            component.showMoreElements();

            expect(spyOnOutput).toHaveBeenCalledTimes(1);
        });
    });

    describe('expandedIdChange', () => {
        it('should call expandedIdChange method from expandedIdManager', () => {
            const spyOnExpandedIdChange = spyOn(expandedIdManager, 'expandedIdChange').and.callThrough();

            component.expandedIdChange(1);

            expect(spyOnExpandedIdChange).toHaveBeenCalledTimes(1);
            expect(spyOnExpandedIdChange).toHaveBeenCalledWith(1);
        });
    });
});
