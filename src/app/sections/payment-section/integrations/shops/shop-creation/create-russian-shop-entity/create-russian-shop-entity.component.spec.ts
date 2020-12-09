import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { ButtonModule } from '@dsh/components/buttons';

import { Contract, PayoutTool, PayoutToolDetails } from '@dsh/api-codegen/capi';
import { Claim } from '@dsh/api-codegen/claim-management';
import { FetchShopsService } from '../../services/fetch-shops/fetch-shops.service';
import { ShopPayoutToolDetailsService } from '../../services/shop-payout-tool-details/shop-payout-tool-details.service';
import { generateMockShopsList } from '../../tests/generate-mock-shops-list';
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
} from './consts';
import { CreateRussianShopEntityComponent } from './create-russian-shop-entity.component';
import { CreateRussianShopEntityService } from './services/create-russian-shop-entity/create-russian-shop-entity.service';
import { BankAccountType } from './types/bank-account-type';
import { RussianShopEntity } from './types/russian-shop-entity';

@Component({
    selector: 'dsh-shop-form',
    template: '',
})
class MockShopFormComponent {
    @Input() form: FormGroup;
    @Input() payoutTool: PayoutTool;
    @Input() contentWindow: HTMLElement;
}

describe('CreateRussianShopEntityComponent', () => {
    let fixture: ComponentFixture<CreateRussianShopEntityComponent>;
    let component: CreateRussianShopEntityComponent;
    let mockCreateRussianShopEntityService: CreateRussianShopEntityService;
    let mockElementRef: ElementRef;
    let mockFetchShopsService: FetchShopsService;
    let mockShopPayoutToolDetailsService: ShopPayoutToolDetailsService;
    let mockMatSnackBar: MatSnackBar;
    let mockRouter: Router;
    let mockHtmlElement: HTMLElement;

    beforeEach(() => {
        mockCreateRussianShopEntityService = mock(CreateRussianShopEntityService);
        mockElementRef = mock(ElementRef);
        mockFetchShopsService = mock(FetchShopsService);
        mockShopPayoutToolDetailsService = mock(ShopPayoutToolDetailsService);
        mockMatSnackBar = mock(MatSnackBar);
        mockRouter = mock(Router);
        mockHtmlElement = mock(HTMLElement);
    });

    beforeEach(() => {
        when(mockFetchShopsService.allShops$).thenReturn(of([]));
        when(mockShopPayoutToolDetailsService.shopPayoutTool$).thenReturn(of());
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), NoopAnimationsModule, MatDialogModule, ButtonModule, ReactiveFormsModule],
            declarations: [CreateRussianShopEntityComponent, MockShopFormComponent],
            providers: [
                {
                    provide: CreateRussianShopEntityService,
                    useFactory: () => instance(mockCreateRussianShopEntityService),
                },
                {
                    provide: FetchShopsService,
                    useFactory: () => instance(mockFetchShopsService),
                },
                {
                    provide: ShopPayoutToolDetailsService,
                    useFactory: () => instance(mockShopPayoutToolDetailsService),
                },
                {
                    provide: MatSnackBar,
                    useFactory: () => instance(mockMatSnackBar),
                },
                {
                    provide: Router,
                    useFactory: () => instance(mockRouter),
                },
            ],
        })
            .overrideComponent(CreateRussianShopEntityComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                    providers: [],
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateRussianShopEntityComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('contentElement', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should return native element if element ref was inited', () => {
            const element = instance(mockHtmlElement);
            when(mockElementRef.nativeElement).thenReturn(element);
            component.contentRef = instance(mockElementRef);

            expect(component.contentElement).toEqual(element);
        });

        it('should return undefined if element ref does not exist', () => {
            component.contentRef = null;

            expect(component.contentElement).toBeUndefined();
        });
    });

    describe('ngOnInit', () => {
        it('should check selected shop id and request payout tool', () => {
            const mockList = generateMockShopsList(5);
            when(mockFetchShopsService.allShops$).thenReturn(of(mockList));
            when(
                mockShopPayoutToolDetailsService.requestPayoutTool(
                    deepEqual({
                        contractID: mockList[2].contractID,
                        payoutToolID: mockList[2].payoutToolID,
                    })
                )
            ).thenReturn();

            fixture.detectChanges();

            component.form.get(BANK_SHOP_ID_FIELD).setValue(mockList[2].id);

            verify(
                mockShopPayoutToolDetailsService.requestPayoutTool(
                    deepEqual({
                        contractID: mockList[2].contractID,
                        payoutToolID: mockList[2].payoutToolID,
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should do nothing if selected shop was not found in shopsList', () => {
            const mockList = generateMockShopsList(5);
            when(mockFetchShopsService.allShops$).thenReturn(of(mockList));
            when(mockShopPayoutToolDetailsService.requestPayoutTool).thenReturn(() => null);

            fixture.detectChanges();

            component.form.get(BANK_SHOP_ID_FIELD).setValue(null);

            verify(mockShopPayoutToolDetailsService.requestPayoutTool).never();
            expect().nothing();
        });
    });

    describe('cancelCreation', () => {
        it('should emit cancel event', () => {
            const spyOnCancel = spyOn(component.cancel, 'emit').and.callThrough();

            fixture.detectChanges();

            component.cancelCreation();

            expect(spyOnCancel).toHaveBeenCalledTimes(1);
        });
    });

    describe('createShop', () => {
        const claim: Claim = {
            id: 100500,
            status: 'active',
            changeset: [],
            revision: 5,
            createdAt: new Date(),
        };
        const shopEntity: RussianShopEntity = {
            url: 'www.exaple.com',
            name: 'shop name',
            [BANK_ACCOUNT_TYPE_FIELD]: BankAccountType.new,
            [NEW_BANK_ACCOUNT_FIELD]: {
                [NEW_BANK_ACCOUNT_SEARCH_FIELD]: 'any',
                [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: 'bank name',
                [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: '0000000000000',
                [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: 'post account',
                [NEW_BANK_ACCOUNT_ACCOUNT_FIELD]: 'account name',
            },
            [BANK_SHOP_ID_FIELD]: '',
            [CONTRACT_FORM_FIELD]: {
                id: 'contract_id',
                createdAt: new Date(),
                status: Contract.StatusEnum.Active,
                paymentInstitutionID: 1,
                contractor: {
                    contractorType: 'LegalEntity',
                },
            },
        };

        it('should use new bank data in bank account type is new', () => {
            component.form.setValue(shopEntity);
            const { url, name, newBankAccount: bankAccount, contract } = component.form.value as RussianShopEntity;

            fixture.detectChanges();

            when(mockRouter.navigate).thenReturn(() => null);
            when(
                mockCreateRussianShopEntityService.createShop(
                    deepEqual({
                        url,
                        name,
                        contract,
                        payoutToolID: null,
                        bankAccount,
                    })
                )
            ).thenReturn(of(claim));

            component.createShop();

            verify(
                mockCreateRussianShopEntityService.createShop(
                    deepEqual({
                        url,
                        name,
                        contract,
                        payoutToolID: null,
                        bankAccount,
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should use existing payout tool data if bank account type is existing', () => {
            const payoutTool: PayoutTool = {
                id: 'payout_tool_id',
                currency: 'USD',
                details: {
                    detailsType: 'type',
                    [NEW_BANK_ACCOUNT_SEARCH_FIELD]: 'any',
                    [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: 'bank name',
                    [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: '0000000000000',
                    [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: 'post account',
                    [NEW_BANK_ACCOUNT_ACCOUNT_FIELD]: 'account name',
                } as PayoutToolDetails,
            };
            when(mockRouter.navigate).thenReturn(() => null);
            when(mockShopPayoutToolDetailsService.shopPayoutTool$).thenReturn(of(payoutTool));

            fixture = TestBed.createComponent(CreateRussianShopEntityComponent);
            component = fixture.componentInstance;
            component.form.setValue({
                ...shopEntity,
                [BANK_ACCOUNT_TYPE_FIELD]: BankAccountType.existing,
            } as RussianShopEntity);
            const { url, name, contract } = component.form.value as RussianShopEntity;

            fixture.detectChanges();

            when(
                mockCreateRussianShopEntityService.createShop(
                    deepEqual({
                        url,
                        name,
                        contract,
                        payoutToolID: 'payout_tool_id',
                        bankAccount: payoutTool.details as any,
                    })
                )
            ).thenReturn(of(claim));

            component.createShop();

            verify(
                mockCreateRussianShopEntityService.createShop(
                    deepEqual({
                        url,
                        name,
                        contract,
                        payoutToolID: 'payout_tool_id',
                        bankAccount: payoutTool.details as any,
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should emit send on success', () => {
            const spyOnSend = spyOn(component.send, 'emit').and.callThrough();
            component.form.setValue(shopEntity);
            fixture.detectChanges();

            when(mockRouter.navigate).thenReturn(() => null);
            when(mockCreateRussianShopEntityService.createShop).thenReturn(() => of(claim));

            component.createShop();

            expect(spyOnSend).toHaveBeenCalledTimes(1);
        });

        it('should navigate to claim using claim id if created successfully', () => {
            component.form.setValue(shopEntity);
            fixture.detectChanges();

            when(mockRouter.navigate(deepEqual(['claim', claim.id]))).thenReturn();
            when(mockCreateRussianShopEntityService.createShop).thenReturn(() => of(claim));

            component.createShop();

            verify(mockRouter.navigate(deepEqual(['claim', claim.id]))).once();
            expect().nothing();
        });

        it('should show error snack bar if error happened', () => {
            component.form.setValue(shopEntity);
            fixture.detectChanges();

            when(mockRouter.navigate).thenReturn(() => null);
            when(mockCreateRussianShopEntityService.createShop).thenReturn(() =>
                of(claim).pipe(
                    switchMap(() => {
                        throw Error('Test error');
                    })
                )
            );
            when(mockMatSnackBar.open('Что-то пошло не так', 'OK')).thenReturn();

            component.createShop();

            verify(mockMatSnackBar.open('Что-то пошло не так', 'OK')).once();
            expect().nothing();
        });
    });
});
