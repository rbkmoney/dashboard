import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ShopCreationService } from '@dsh/app/shared/components/shop-creation';
import { ButtonModule } from '@dsh/components/buttons';

import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';
import { ShopsFiltersStoreService } from './services/shops-filters-store/shops-filters-store.service';
import { ShopsFiltersService } from './services/shops-filters/shops-filters.service';
import { ShopFiltersModule } from './shop-filters';
import { ShopsExpandedIdManagerService } from './shops-list/services/shops-expanded-id-manager/shops-expanded-id-manager.service';
import { ShopListModule } from './shops-list/shop-list.module';
import { ShopsComponent } from './shops.component';

describe('ShopsComponent', () => {
    let component: ShopsComponent;
    let fixture: ComponentFixture<ShopsComponent>;
    let mockFetchShopsService: FetchShopsService;
    let mockShopsExpandedIdManagerService: ShopsExpandedIdManagerService;
    let mockShopsBalanceService: ShopsBalanceService;
    let mockShopsFiltersService: ShopsFiltersService;
    let mockShopsFiltersStoreService: ShopsFiltersStoreService;
    let mockActivatedRoute: ActivatedRoute;
    let mockShopCreationService: ShopCreationService;

    beforeEach(() => {
        mockFetchShopsService = mock(FetchShopsService);
        mockShopsExpandedIdManagerService = mock(ShopsExpandedIdManagerService);
        mockShopsBalanceService = mock(ShopsBalanceService);
        mockShopsFiltersService = mock(ShopsFiltersService);
        mockShopsFiltersStoreService = mock(ShopsFiltersStoreService);
        mockActivatedRoute = mock(ActivatedRoute);
        mockShopCreationService = mock(ShopCreationService);
    });

    beforeEach(async () => {
        when(mockFetchShopsService.isLoading$).thenReturn(of(false));
        when(mockFetchShopsService.shownShops$).thenReturn(of([]));
        when(mockFetchShopsService.lastUpdated$).thenReturn(of(''));
        when(mockFetchShopsService.hasMore$).thenReturn(of(false));
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FlexLayoutModule,
                ButtonModule,
                RouterModule,
                MatRadioModule,
                ShopListModule,
                ShopFiltersModule,
                RouterTestingModule.withRoutes([]),
                TranslocoTestingModule.withLangs({
                    en: {
                        shops: {
                            panel: {
                                name: 'Name',
                            },
                            title: 'Title',
                        },
                    },
                }),
            ],
            declarations: [ShopsComponent],
            providers: [
                {
                    provide: FetchShopsService,
                    useFactory: () => instance(mockFetchShopsService),
                },
                {
                    provide: ShopsExpandedIdManagerService,
                    useFactory: () => instance(mockShopsExpandedIdManagerService),
                },
                {
                    provide: ShopCreationService,
                    useFactory: () => instance(mockShopCreationService),
                },
                {
                    provide: ActivatedRoute,
                    useFactory: () => instance(mockActivatedRoute),
                },
                {
                    provide: ShopsBalanceService,
                    useFactory: () => instance(mockShopsBalanceService),
                },
                {
                    provide: ShopsFiltersService,
                    useFactory: () => instance(mockShopsFiltersService),
                },
                {
                    provide: ShopsFiltersStoreService,
                    useFactory: () => instance(mockShopsFiltersStoreService),
                },
            ],
        })
            .overrideComponent(ShopsComponent, {
                set: {
                    providers: [],
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopsComponent);
        component = fixture.componentInstance;
    });

    beforeEach(() => {
        when(mockActivatedRoute.params).thenReturn(of({ realm: PaymentInstitutionRealm.Test }));
        when(mockShopsExpandedIdManagerService.expandedId$).thenReturn(of(-1));
        when(mockShopsFiltersStoreService.data$).thenReturn(of({}));
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should use realm data to init FetchShopsService', () => {
            when(mockActivatedRoute.params).thenReturn(of({ realm: PaymentInstitutionRealm.Live }));
            when(mockFetchShopsService.initRealm(PaymentInstitutionRealm.Live)).thenReturn(null);

            fixture.detectChanges();

            verify(mockFetchShopsService.initRealm(PaymentInstitutionRealm.Live)).once();
            expect().nothing();
        });

        it('should use expanded id to init FetchShopsService offset', () => {
            when(mockShopsExpandedIdManagerService.expandedId$).thenReturn(of(4));
            when(mockFetchShopsService.initOffsetIndex(4)).thenReturn(null);

            fixture.detectChanges();

            verify(mockFetchShopsService.initOffsetIndex(4)).once();
            expect().nothing();
        });
    });

    describe('refreshData', () => {
        it('should call FetchShopsService refreshData', () => {
            when(mockFetchShopsService.refreshData()).thenReturn(null);

            fixture.detectChanges();
            component.refreshData();

            verify(mockFetchShopsService.refreshData()).once();
            expect().nothing();
        });
    });

    describe('showMore', () => {
        it('should call FetchShopsService showMore', () => {
            when(mockFetchShopsService.showMore()).thenReturn(null);

            fixture.detectChanges();
            component.showMore();

            verify(mockFetchShopsService.showMore()).once();
            expect().nothing();
        });
    });

    describe('createShop', () => {
        it('should call create shop with activated route realm', () => {
            when(mockActivatedRoute.snapshot).thenReturn({ params: { realm: PaymentInstitutionRealm.Live } } as any);
            when(mockShopCreationService.createShop()).thenReturn(null);

            component.createShop();

            verify(mockShopCreationService.createShop()).once();
            expect().nothing();
        });
    });
});
