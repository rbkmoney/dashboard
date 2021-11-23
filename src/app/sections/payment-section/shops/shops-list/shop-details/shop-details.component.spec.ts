import { ClipboardModule } from '@angular/cdk/clipboard';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { CategoriesModule } from '@dsh/api/categories';
import { ContractsModule } from '@dsh/api/contracts';
import { ContractDetailsModule, PayoutToolModule } from '@dsh/app/shared/components';
import { ShopContractDetailsService } from '@dsh/app/shared/services/shop-contract-details';
import { ButtonModule } from '@dsh/components/buttons';
import { DetailsItemModule } from '@dsh/components/layout';

import { ShopPayoutToolDetailsService } from '../../services/shop-payout-tool-details/shop-payout-tool-details.service';
import { generateMockShopItem } from '../../tests/generate-shop-item';
import { ShopBalanceModule } from '../shop-balance';
import { ShopActionsComponent } from './components/shop-actions/shop-actions.component';
import { ShopContractDetailsComponent } from './components/shop-contract-details/shop-contract-details.component';
import { ShopIdComponent } from './components/shop-id/shop-id.component';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
import { ShopPayoutToolDetailsComponent } from './components/shop-payout-tool-details/shop-payout-tool-details.component';
import { CategoryService } from './services/category/category.service';
import { ShopActionsService } from './services/shop-actions/shop-actions.service';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopActionResult } from './types/shop-action-result';

describe('ShopDetailsComponent', () => {
    let component: ShopDetailsComponent;
    let fixture: ComponentFixture<ShopDetailsComponent>;
    let mockCategoryService: CategoryService;
    let mockContractsService: ShopContractDetailsService;
    let mockPayoutsService: ShopPayoutToolDetailsService;
    let mockActionsService: ShopActionsService;

    beforeEach(() => {
        mockCategoryService = mock(CategoryService);
        mockContractsService = mock(ShopContractDetailsService);
        mockPayoutsService = mock(ShopPayoutToolDetailsService);
        mockActionsService = mock(ShopActionsService);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule,
                ButtonModule,
                TranslocoTestingModule.withLangs({
                    en: {},
                }),
                MatDividerModule,
                DetailsItemModule,
                ClipboardModule,
                ContractDetailsModule,
                PayoutToolModule,
                ShopBalanceModule,
                CategoriesModule,
                ContractsModule,
                MatSnackBarModule,
                MatDialogModule,
            ],
            declarations: [
                ShopDetailsComponent,
                ShopContractDetailsComponent,
                ShopPayoutToolDetailsComponent,
                ShopActionsComponent,
                ShopIdComponent,
                ShopInfoComponent,
            ],
            providers: [
                {
                    provide: CategoryService,
                    useFactory: () => instance(mockCategoryService),
                },
                {
                    provide: ShopContractDetailsService,
                    useFactory: () => instance(mockContractsService),
                },
                {
                    provide: ShopPayoutToolDetailsService,
                    useFactory: () => instance(mockPayoutsService),
                },
                {
                    provide: ShopActionsService,
                    useValue: mockActionsService,
                },
            ],
        })
            .overrideComponent(ShopActionsComponent, {
                set: {
                    providers: [],
                },
            })
            .overrideComponent(ShopContractDetailsComponent, {
                set: {
                    providers: [],
                },
            })
            .overrideComponent(ShopPayoutToolDetailsComponent, {
                set: {
                    providers: [],
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        when(mockCategoryService.category$).thenReturn(of(undefined));
        when(mockContractsService.shopContract$).thenReturn(of(null));
        when(mockContractsService.errorOccurred$).thenReturn(of(false));
        when(mockPayoutsService.shopPayoutTool$).thenReturn(of(null));
        when(mockPayoutsService.errorOccurred$).thenReturn(of(false));
        when(mockActionsService.suspend).thenReturn(() => of(ShopActionResult.Success));
        when(mockActionsService.activate).thenReturn(() => of(ShopActionResult.Success));
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopDetailsComponent);
        component = fixture.componentInstance;

        component.shop = generateMockShopItem(1);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('requestUpdateData', () => {
        it('should emit updateData', () => {
            const spyOnUpdateData = spyOn(component.updateData, 'emit').and.callThrough();

            component.requestUpdateData();

            expect(spyOnUpdateData).toHaveBeenCalledTimes(1);
        });
    });
});
