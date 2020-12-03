import { ClipboardModule } from '@angular/cdk/clipboard';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';

import { CategoriesModule } from '@dsh/api/categories';
import { ContractsModule } from '@dsh/api/contracts';
import { ContractDetailsModule, PayoutToolModule } from '@dsh/app/shared/components';
import { ButtonModule } from '@dsh/components/buttons';
import { DetailsItemModule } from '@dsh/components/layout';

import { Category } from '../../../../../../api-codegen/capi';
import { ShopContractDetailsService } from '../../services/shop-contract-details/shop-contract-details.service';
import { ShopPayoutToolDetailsService } from '../../services/shop-payout-tool-details/shop-payout-tool-details.service';
import { generateMockShopItem } from '../../tests/generate-shop-item';
import { ShopBalanceModule } from '../shop-balance';
import { MockShopContractDetailsService } from '../tests/mock-shop-contract-details-service';
import { MockShopPayoutToolDetailsService } from '../tests/mock-shop-payout-tool-details-service';
import { ShopActionsComponent } from './components/shop-actions/shop-actions.component';
import { ShopContractDetailsComponent } from './components/shop-contract-details/shop-contract-details.component';
import { ShopIdComponent } from './components/shop-id/shop-id.component';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
import { ShopPayoutToolDetailsComponent } from './components/shop-payout-tool-details/shop-payout-tool-details.component';
import { CategoryService } from './services/category/category.service';
import { ShopActionsService } from './services/shop-actions/shop-actions.service';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopActionResult } from './types/shop-action-result';

class MockCategoryService {
    category$: Observable<Category | undefined> = of(undefined);

    updateID(): void {
        // do nothing
    }
}

class MockShopActionsService {
    suspend(): Observable<ShopActionResult> {
        return of(ShopActionResult.SUCCESS);
    }

    activate(): Observable<ShopActionResult> {
        return of(ShopActionResult.SUCCESS);
    }
}

describe('ShopDetailsComponent', () => {
    let component: ShopDetailsComponent;
    let fixture: ComponentFixture<ShopDetailsComponent>;
    let mockCategoryService: MockCategoryService;
    let mockContractsService: MockShopContractDetailsService;
    let mockPayoutsService: MockShopPayoutToolDetailsService;
    let mockActionsService: MockShopActionsService;

    beforeEach(() => {
        mockCategoryService = new MockCategoryService();
        mockContractsService = new MockShopContractDetailsService();
        mockPayoutsService = new MockShopPayoutToolDetailsService();
        mockActionsService = new MockShopActionsService();
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
                    useValue: mockCategoryService,
                },
                {
                    provide: ShopContractDetailsService,
                    useValue: mockContractsService,
                },
                {
                    provide: ShopPayoutToolDetailsService,
                    useValue: mockPayoutsService,
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
    }));

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
