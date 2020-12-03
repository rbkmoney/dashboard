import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ButtonModule } from '@dsh/components/buttons';

import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';
import { ShopsFiltersStoreService } from './services/shops-filters-store/shops-filters-store.service';
import { ShopsFiltersService } from './services/shops-filters/shops-filters.service';
import { CreateShopDialogComponent } from './shop-creation/components/create-shop-dialog/create-shop-dialog.component';
import { ShopFiltersModule } from './shop-filters';
import { ShopsExpandedIdManagerService } from './shops-list/services/shops-expanded-id-manager/shops-expanded-id-manager.service';
import { ShopListModule } from './shops-list/shop-list.module';
import { ShopsComponent } from './shops.component';

describe('ShopsComponent', () => {
    let component: ShopsComponent;
    let fixture: ComponentFixture<ShopsComponent>;
    let mockFetchShopsService: FetchShopsService;
    let mockShopsExpandedIdManagerService: ShopsExpandedIdManagerService;
    let mockMatDialog: MatDialog;
    let mockActivatedRoute: ActivatedRoute;
    let mockShopsBalanceService: ShopsBalanceService;
    let mockShopsFiltersService: ShopsFiltersService;
    let mockShopsFiltersStoreService: ShopsFiltersStoreService;
    let mockMatDialogRef: MatDialogRef<CreateShopDialogComponent>;

    beforeEach(() => {
        mockFetchShopsService = mock(FetchShopsService);
        mockShopsExpandedIdManagerService = mock(ShopsExpandedIdManagerService);
        mockMatDialog = mock(MatDialog);
        mockActivatedRoute = mock(ActivatedRoute);
        mockShopsBalanceService = mock(ShopsBalanceService);
        mockShopsFiltersService = mock(ShopsFiltersService);
        mockShopsFiltersStoreService = mock(ShopsFiltersStoreService);
        mockMatDialogRef = mock(MatDialogRef);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopsComponent);
        component = fixture.componentInstance;
    });

    beforeEach(() => {
        when(mockActivatedRoute.params).thenReturn(of({ realm: PaymentInstitutionRealm.test }));
        when(mockShopsExpandedIdManagerService.expandedId$).thenReturn(of(-1));
        when(mockShopsFiltersStoreService.data$).thenReturn(of({}));
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should use realm data to init FetchShopsService', () => {
            when(mockActivatedRoute.params).thenReturn(of({ realm: PaymentInstitutionRealm.live }));
            when(mockFetchShopsService.initRealm(PaymentInstitutionRealm.live)).thenReturn(null);

            fixture.detectChanges();

            verify(mockFetchShopsService.initRealm(PaymentInstitutionRealm.live)).once();
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
    //
    // describe('createShop', () => {
    //     it('should open creation dialog', () => {
    //         when(mockActivatedRoute.snapshot).thenReturn({
    //             params: {
    //                 realm: PaymentInstitutionRealm.test,
    //             },
    //         } as any);
    //         when(
    //             mockMatDialog.open(
    //                 CreateShopDialogComponent,
    //                 deepEqual({
    //                     width: '552px',
    //                     maxHeight: '90vh',
    //                     disableClose: true,
    //                     data: {
    //                         realm: PaymentInstitutionRealm.test,
    //                     },
    //                 })
    //             )
    //         ).thenReturn(instance(mockMatDialogRef));
    //         when(mockMatDialogRef.afterClosed()).thenReturn(of(null));
    //
    //         fixture.detectChanges();
    //         component.createShop();
    //
    //         verify(
    //             mockMatDialog.open(
    //                 CreateShopDialogComponent,
    //                 deepEqual({
    //                     width: '552px',
    //                     maxHeight: '90vh',
    //                     disableClose: true,
    //                     data: {
    //                         realm: PaymentInstitutionRealm.test,
    //                     },
    //                 })
    //             )
    //         ).once();
    //         expect().nothing();
    //     });
    // });
});
