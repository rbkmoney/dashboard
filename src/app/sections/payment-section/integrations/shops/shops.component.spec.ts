import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { ShopCreationService } from '@dsh/app/shared/components/shop-creation';
import { provideMockService } from '@dsh/app/shared/tests';
import { ButtonModule } from '@dsh/components/buttons';

import { PaymentInstitutionRealmService } from '../../services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from '../../services/realm-shops/realm-shops.service';
import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';
import { ShopsFiltersStoreService } from './services/shops-filters-store/shops-filters-store.service';
import { ShopsFiltersService } from './services/shops-filters/shops-filters.service';
import { ShopFiltersModule } from './shop-filters';
import { ShopsExpandedIdManagerService } from './shops-list/services/shops-expanded-id-manager/shops-expanded-id-manager.service';
import { ShopListModule } from './shops-list/shop-list.module';
import { ShopsComponent } from './shops.component';

import RealmEnum = PaymentInstitution.RealmEnum;

describe('ShopsComponent', () => {
    let component: ShopsComponent;
    let fixture: ComponentFixture<ShopsComponent>;
    let mockFetchShopsService: FetchShopsService;
    let mockShopsExpandedIdManagerService: ShopsExpandedIdManagerService;
    let mockShopsBalanceService: ShopsBalanceService;
    let mockShopsFiltersService: ShopsFiltersService;
    let mockShopsFiltersStoreService: ShopsFiltersStoreService;
    let mockShopCreationService: ShopCreationService;
    let mockRealmShopsService: RealmShopsService;
    let mockRealmService: PaymentInstitutionRealmService;

    beforeEach(() => {
        mockFetchShopsService = mock(FetchShopsService);
        mockShopsExpandedIdManagerService = mock(ShopsExpandedIdManagerService);
        mockShopsBalanceService = mock(ShopsBalanceService);
        mockShopsFiltersService = mock(ShopsFiltersService);
        mockShopsFiltersStoreService = mock(ShopsFiltersStoreService);
        mockShopCreationService = mock(ShopCreationService);
        mockRealmShopsService = mock(RealmShopsService);
        mockRealmService = mock(PaymentInstitutionRealmService);
    });

    beforeEach(async () => {
        when(mockFetchShopsService.isLoading$).thenReturn(of(false));
        when(mockFetchShopsService.shownShops$).thenReturn(of([]));
        when(mockFetchShopsService.lastUpdated$).thenReturn(of(''));
        when(mockFetchShopsService.hasMore$).thenReturn(of(false));
        when(mockRealmService.realm$).thenReturn(of(RealmEnum.Test));
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
                provideMockService(RealmShopsService, mockRealmShopsService),
                provideMockService(PaymentInstitutionRealmService, mockRealmService),
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
        when(mockShopsExpandedIdManagerService.expandedId$).thenReturn(of(-1));
        when(mockShopsFiltersStoreService.data$).thenReturn(of({}));
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should use realm data to init FetchShopsService', () => {
            when(mockRealmService.realm$).thenReturn(of(RealmEnum.Live));
            when(mockFetchShopsService.initRealm(RealmEnum.Live)).thenReturn(null);

            fixture.detectChanges();

            verify(mockFetchShopsService.initRealm(RealmEnum.Live)).once();
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
            component.createShop();

            verify(mockShopCreationService.createShop(anything())).once();
            expect().nothing();
        });
    });
});
