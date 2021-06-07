import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { AutocompleteVirtualScrollModule } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { DetailsItemModule } from '@dsh/components/layout';

import { ShopContractDetailsService } from '../../../../services/shop-contract-details/shop-contract-details.service';
import { generateMockShop } from '../../../../tests/generate-mock-shop';
import { ShopOptionsSelectionService } from '../../services/shop-options-selection/shop-options-selection.service';
import { ShopContractComponent } from './shop-contract.component';

describe('ShopContractComponent', () => {
    let component: ShopContractComponent;
    let fixture: ComponentFixture<ShopContractComponent>;
    let mockShopOptionsSelectionService: ShopOptionsSelectionService;
    let mockShopContractDetailsService: ShopContractDetailsService;

    const mockShop = generateMockShop(15);

    beforeEach(async () => {
        mockShopOptionsSelectionService = mock(ShopOptionsSelectionService);
        mockShopContractDetailsService = mock(ShopContractDetailsService);

        when(mockShopContractDetailsService.shopContract$).thenReturn(of());
        when(mockShopContractDetailsService.isLoading$).thenReturn(of());
        when(mockShopContractDetailsService.errorOccurred$).thenReturn(of());

        when(mockShopOptionsSelectionService.control).thenReturn(new FormControl());
        when(mockShopOptionsSelectionService.options$).thenReturn(of([]));
        when(mockShopOptionsSelectionService.selectedShop$).thenReturn(of(mockShop));

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
        fixture = TestBed.createComponent(ShopContractComponent);
        component = fixture.componentInstance;
        const componentControl = new FormControl();
        component.control = componentControl;
        fixture.detectChanges();
    });

    describe('creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        it('should request new contract on every selected shop change', () => {
            verify(mockShopContractDetailsService.requestContract(mockShop.contractID)).once();
            expect().nothing();
        });
    });
});
