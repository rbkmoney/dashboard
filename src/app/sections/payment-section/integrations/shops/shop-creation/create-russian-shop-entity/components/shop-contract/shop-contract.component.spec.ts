import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { AutocompleteVirtualScrollModule } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { DetailsItemModule } from '@dsh/components/layout';

import { Contract } from '../../../../../../../../api-codegen/capi';
import { ShopContractDetailsService } from '../../../../services/shop-contract-details/shop-contract-details.service';
import { generateMockShop } from '../../../../tests/generate-mock-shop';
import { ShopOptionsSelectionService } from '../../services/shop-options-selection/shop-options-selection.service';
import { ShopContractComponent } from './shop-contract.component';

describe('ShopContractComponent', () => {
    let component: ShopContractComponent;
    let fixture: ComponentFixture<ShopContractComponent>;
    let mockShopOptionsSelectionService: ShopOptionsSelectionService;
    let mockShopContractDetailsService: ShopContractDetailsService;

    async function getTestingModule() {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), NoopAnimationsModule, AutocompleteVirtualScrollModule, DetailsItemModule],
            declarations: [ShopContractComponent],
            providers: [
                {
                    provide: ShopOptionsSelectionService,
                    useFactory: () => instance(mockShopOptionsSelectionService),
                },
                {
                    provide: ShopContractDetailsService,
                    useFactory: () => instance(mockShopContractDetailsService),
                },
            ],
        })
            .overrideComponent(ShopContractComponent, {
                set: {
                    providers: [],
                },
            })
            .compileComponents();
    }

    function createComponent() {
        fixture = TestBed.createComponent(ShopContractComponent);
        component = fixture.componentInstance;
    }

    async function createTestingComponent() {
        await getTestingModule();

        createComponent();
        fixture.detectChanges();
    }

    beforeEach(() => {
        mockShopOptionsSelectionService = mock(ShopOptionsSelectionService);
        mockShopContractDetailsService = mock(ShopContractDetailsService);
    });

    beforeEach(() => {
        when(mockShopOptionsSelectionService.control).thenReturn(new FormControl());
        when(mockShopOptionsSelectionService.options$).thenReturn(of([]));
        when(mockShopOptionsSelectionService.selectedShop$).thenReturn(of());
        when(mockShopContractDetailsService.shopContract$).thenReturn(of());
    });

    describe('creation', () => {
        beforeEach(async () => {
            await createTestingComponent();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        it('should request new contract on every selected shop change', async () => {
            const mockShop = generateMockShop(15);

            when(mockShopOptionsSelectionService.selectedShop$).thenReturn(of(mockShop));
            when(mockShopContractDetailsService.requestContract(mockShop.contractID)).thenReturn();

            await createTestingComponent();

            verify(mockShopContractDetailsService.requestContract(mockShop.contractID)).once();
            expect().nothing();
        });

        it('should update control value using contract value', async () => {
            const contract: Contract = {
                id: 'contract_id',
                createdAt: new Date(),
                status: Contract.StatusEnum.Active,
                paymentInstitutionID: 1,
                contractor: {
                    contractorType: 'LegalEntity',
                },
            };
            const componentControl = new FormControl();

            when(mockShopContractDetailsService.shopContract$).thenReturn(of(contract));

            await getTestingModule();
            createComponent();

            component.control = componentControl;

            fixture.detectChanges();

            expect(component.control).toEqual(componentControl);
            expect(component.control.value).toEqual(contract);
        });
    });
});
