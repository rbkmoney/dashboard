import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { AutocompleteVirtualScrollModule } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { DetailsItemModule } from '@dsh/components/layout';

import { FetchShopsService } from '../../../../services/fetch-shops/fetch-shops.service';
import { ShopContractDetailsService } from '../../../../services/shop-contract-details/shop-contract-details.service';
import {
    BANK_ACCOUNT_TYPE_FIELD,
    BANK_SHOP_ID_FIELD,
    CONTRACT_FORM_FIELD,
    NEW_BANK_ACCOUNT_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_BANK_BIK_FIELD,
    NEW_BANK_ACCOUNT_BANK_NAME_FIELD,
    NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_SEARCH_FIELD,
} from '../../consts';
import { ShopOptionsSelectionService } from '../../services/shop-options-selection/shop-options-selection.service';
import { BankAccountType } from '../../types/bank-account-type';
import { ShopContractComponent } from '../shop-contract/shop-contract.component';
import { ShopFormComponent } from './shop-form.component';

describe('ShopFormComponent', () => {
    let component: ShopFormComponent;
    let fixture: ComponentFixture<ShopFormComponent>;
    let mockFetchShopsService: FetchShopsService;
    let mockShopOptionsSelectionService: ShopOptionsSelectionService;
    let mockShopContractDetailsService: ShopContractDetailsService;

    beforeEach(() => {
        mockFetchShopsService = mock(FetchShopsService);
        mockShopOptionsSelectionService = mock(ShopOptionsSelectionService);
        mockShopContractDetailsService = mock(ShopContractDetailsService);
    });

    beforeEach(() => {
        when(mockFetchShopsService.allShops$).thenReturn(of([]));
        when(mockShopOptionsSelectionService.control).thenReturn(new FormControl());
        when(mockShopOptionsSelectionService.options$).thenReturn(of([]));
        when(mockShopOptionsSelectionService.selectedShop$).thenReturn(of());
        when(mockShopContractDetailsService.shopContract$).thenReturn(of());
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatDividerModule,
                NoopAnimationsModule,
                AutocompleteVirtualScrollModule,
                DetailsItemModule,
                MatRadioModule,
            ],
            declarations: [ShopFormComponent, ShopContractComponent],
            providers: [
                {
                    provide: FetchShopsService,
                    useFactory: () => instance(mockFetchShopsService),
                },
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
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopFormComponent);
        component = fixture.componentInstance;

        component.form = new FormGroup({
            url: new FormControl(''),
            name: new FormControl(''),
            [CONTRACT_FORM_FIELD]: new FormControl(''),
            [BANK_ACCOUNT_TYPE_FIELD]: new FormControl(''),
            [BANK_SHOP_ID_FIELD]: new FormControl(''),
            [NEW_BANK_ACCOUNT_FIELD]: new FormGroup({
                [NEW_BANK_ACCOUNT_SEARCH_FIELD]: new FormControl(''),
                [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: new FormControl(''),
                [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: new FormControl(''),
                [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: new FormControl(''),
                [NEW_BANK_ACCOUNT_ACCOUNT_FIELD]: new FormControl(''),
            }),
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('contractControl', () => {
        it('should return contract control', () => {
            const contractControl = new FormControl('');

            component.form = new FormGroup({
                [CONTRACT_FORM_FIELD]: contractControl,
            });

            expect(component.contractControl).toEqual(contractControl);
        });

        it(`should throw an error if form doesn't exist`, () => {
            component.form = undefined;
            expect(() => component.contractControl).toThrowError(`Form wasn't provided`);
        });

        it(`should throw an error if control doesn't exist on form`, () => {
            component.form = new FormGroup({});
            expect(() => component.contractControl).toThrowError(
                `Form doesn't contains ${CONTRACT_FORM_FIELD} control`
            );
        });
    });

    describe('accountType checks', () => {
        it(`should throw an error if form doesn't exist`, () => {
            component.form = undefined;
            expect(() => component.isNewBankAccount).toThrowError(`Form wasn't provided`);
            expect(() => component.isExistingBankAccount).toThrowError(`Form wasn't provided`);
        });

        it(`should throw an error if control doesn't exist on form`, () => {
            component.form = new FormGroup({});
            expect(() => component.isNewBankAccount).toThrowError(
                `Form doesn't contains ${BANK_ACCOUNT_TYPE_FIELD} control`
            );
            expect(() => component.isExistingBankAccount).toThrowError(
                `Form doesn't contains ${BANK_ACCOUNT_TYPE_FIELD} control`
            );
        });
    });

    describe('isNewBankAccount', () => {
        it('should return true if account type is new', () => {
            const bankAccountTypeControl = new FormControl(BankAccountType.new);

            component.form = new FormGroup({
                [BANK_ACCOUNT_TYPE_FIELD]: bankAccountTypeControl,
            });

            expect(component.isNewBankAccount).toBe(true);
        });

        it('should return false if account type is existing', () => {
            const bankAccountTypeControl = new FormControl(BankAccountType.existing);

            component.form = new FormGroup({
                [BANK_ACCOUNT_TYPE_FIELD]: bankAccountTypeControl,
            });

            expect(component.isNewBankAccount).toBe(false);
        });
    });

    describe('isExistingBankAccount', () => {
        it('should return true if account type is existing', () => {
            const bankAccountTypeControl = new FormControl(BankAccountType.existing);

            component.form = new FormGroup({
                [BANK_ACCOUNT_TYPE_FIELD]: bankAccountTypeControl,
            });

            expect(component.isExistingBankAccount).toBe(true);
        });

        it('should return false if account type is new', () => {
            const bankAccountTypeControl = new FormControl(BankAccountType.new);

            component.form = new FormGroup({
                [BANK_ACCOUNT_TYPE_FIELD]: bankAccountTypeControl,
            });

            expect(component.isExistingBankAccount).toBe(false);
        });
    });

    describe('ngOnInit', () => {
        let accountTypeControl: FormControl;
        let newBankAccountControl: FormGroup;
        let shopIdControl: FormControl;

        beforeEach(() => {
            accountTypeControl = component.form.get(BANK_ACCOUNT_TYPE_FIELD) as FormControl;
            newBankAccountControl = component.form.get(NEW_BANK_ACCOUNT_FIELD) as FormGroup;
            shopIdControl = component.form.get(BANK_SHOP_ID_FIELD) as FormControl;
        });

        it('should enable newBankAccount and disable bankShopIdControl if account type is new', () => {
            accountTypeControl.setValue(BankAccountType.new);

            expect(newBankAccountControl.disabled).toBe(false);
            expect(shopIdControl.disabled).toBe(true);
        });

        it('should disable newBankAccount and enable bankShopIdControl if account type is existing', () => {
            accountTypeControl.setValue(BankAccountType.existing);

            expect(newBankAccountControl.disabled).toBe(true);
            expect(shopIdControl.disabled).toBe(false);
        });

        it('should disable newBankAccount and disable bankShopIdControl by default', () => {
            accountTypeControl.setValue('');

            expect(newBankAccountControl.disabled).toBe(true);
            expect(shopIdControl.disabled).toBe(true);
        });
    });
});
