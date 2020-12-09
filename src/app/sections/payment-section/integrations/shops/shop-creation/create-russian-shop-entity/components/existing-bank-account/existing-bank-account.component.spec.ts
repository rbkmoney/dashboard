import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { Shop } from '@dsh/api-codegen/capi';
import { AutocompleteVirtualScrollModule } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll';
import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { generateMockShopsList } from '../../../../tests/generate-mock-shops-list';
import { BANK_SHOP_ID_FIELD } from '../../consts';
import { ShopOptionsSelectionService } from '../../services/shop-options-selection/shop-options-selection.service';
import { ExistingBankAccountComponent } from './existing-bank-account.component';

describe('ExistingBankAccountComponent', () => {
    let component: ExistingBankAccountComponent;
    let fixture: ComponentFixture<ExistingBankAccountComponent>;
    let mockShopOptionsSelectionService: ShopOptionsSelectionService;
    const mockShopSelectionControl = new FormControl();

    async function makeTestingModule() {
        TestBed.resetTestingModule();
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ReactiveFormsModule, AutocompleteVirtualScrollModule, getTranslocoModule()],
            providers: [
                {
                    provide: ShopOptionsSelectionService,
                    useFactory: () => instance(mockShopOptionsSelectionService),
                },
            ],
            declarations: [ExistingBankAccountComponent],
        })
            .overrideComponent(ExistingBankAccountComponent, {
                set: {
                    providers: [],
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(ExistingBankAccountComponent);
        component = fixture.componentInstance;
    }

    beforeEach(() => {
        mockShopOptionsSelectionService = mock(ShopOptionsSelectionService);

        when(mockShopOptionsSelectionService.options$).thenReturn(of([]));
        when(mockShopOptionsSelectionService.selectedShop$).thenReturn(of());
        when(mockShopOptionsSelectionService.control).thenReturn(mockShopSelectionControl);
    });

    describe('creation', () => {
        beforeEach(async () => {
            await makeTestingModule();
        });

        it('should create', () => {
            when(mockShopOptionsSelectionService.selectedShop$).thenReturn(of());
            component.form = new FormGroup({
                [BANK_SHOP_ID_FIELD]: new FormControl(),
            });

            fixture.detectChanges();

            expect(component).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        let mockShopsList: Shop[];
        let mockOptionsList: BaseOption<string>[];

        beforeEach(() => {
            mockShopsList = generateMockShopsList(15);
            mockOptionsList = mockShopsList.map(({ id, details: { name: label } }) => {
                return { id, label };
            });

            when(mockShopOptionsSelectionService.options$).thenReturn(of(mockOptionsList));
        });

        it('should init innerFormControl with form group value', async () => {
            await makeTestingModule();

            component.form = new FormGroup({
                [BANK_SHOP_ID_FIELD]: new FormControl(mockOptionsList[5].id),
            });

            fixture.detectChanges();

            expect(component.innerShopControl.value).toEqual(mockOptionsList[5]);
        });

        it('should update form control on every selected change', async () => {
            const mockFormControl = mock(FormControl);

            when(mockFormControl.value).thenReturn(undefined);
            when(mockShopOptionsSelectionService.selectedShop$).thenReturn(of(mockShopsList[2], mockShopsList[5]));
            when(mockFormControl.setValue(mockShopsList[2].id)).thenReturn();
            when(mockFormControl.setValue(mockShopsList[5].id)).thenReturn();

            await makeTestingModule();

            component.form = new FormGroup({
                [BANK_SHOP_ID_FIELD]: instance(mockFormControl),
            });

            fixture.detectChanges();

            verify(mockFormControl.setValue(mockShopsList[2].id)).once();
            verify(mockFormControl.setValue(mockShopsList[5].id)).once();
            expect().nothing();
        });
    });
});
