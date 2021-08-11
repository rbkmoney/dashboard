import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { instance, mock } from 'ts-mockito';

import { DaDataService as DaDataApiService } from '@dsh/api-codegen/aggr-proxy';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { DaDataModule } from '../../../../../../dadata';
import {
    NEW_BANK_ACCOUNT_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_BANK_BIK_FIELD,
    NEW_BANK_ACCOUNT_BANK_NAME_FIELD,
    NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_SEARCH_FIELD,
} from '../../consts';
import { NewBankAccountComponent } from './new-bank-account.component';

describe('NewBankAccountComponent', () => {
    let component: NewBankAccountComponent;
    let fixture: ComponentFixture<NewBankAccountComponent>;
    let mockDaDataApiService: DaDataApiService;

    beforeEach(() => {
        mockDaDataApiService = mock(DaDataApiService);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                DaDataModule,
                NoopAnimationsModule,
                getTranslocoModule(),
            ],
            providers: [
                {
                    provide: DaDataApiService,
                    useFactory: () => instance(mockDaDataApiService),
                },
            ],
            declarations: [NewBankAccountComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewBankAccountComponent);
        component = fixture.componentInstance;

        component.form = new FormGroup({
            [NEW_BANK_ACCOUNT_FIELD]: new FormGroup({
                [NEW_BANK_ACCOUNT_SEARCH_FIELD]: new FormControl(''),
                [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: new FormControl('', [Validators.required]),
                [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: new FormControl('', [Validators.required]),
                [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: new FormControl('', [Validators.required]),
                [NEW_BANK_ACCOUNT_ACCOUNT_FIELD]: new FormControl('', [Validators.required]),
            }),
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('bankAccountForm', () => {
        it('should return form group', () => {
            const testFormGroup = new FormGroup({
                [NEW_BANK_ACCOUNT_FIELD]: new FormGroup({
                    [NEW_BANK_ACCOUNT_SEARCH_FIELD]: new FormControl(''),
                    [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: new FormControl('', [Validators.required]),
                    [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: new FormControl('', [Validators.required]),
                    [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: new FormControl('', [Validators.required]),
                    [NEW_BANK_ACCOUNT_ACCOUNT_FIELD]: new FormControl('', [Validators.required]),
                }),
            });

            component.form = testFormGroup;

            expect(component.bankAccountForm).toEqual(testFormGroup.get(NEW_BANK_ACCOUNT_FIELD) as FormGroup);
        });

        it(`should throw an error if form wasn't provided`, () => {
            component.form = undefined;
            expect(() => component.bankAccountForm).toThrowError(`Form wasn't provided`);
        });

        it(`should throw an error if group doesn't exist on form`, () => {
            component.form = new FormGroup({});
            expect(() => component.bankAccountForm).toThrowError(
                `Form doesn't contains "${NEW_BANK_ACCOUNT_FIELD}" control`
            );
        });
    });

    describe('bankAccountNameControl', () => {
        it('should return form group', () => {
            const testFormControl = new FormControl('my value', [Validators.required]);

            component.form = new FormGroup({
                [NEW_BANK_ACCOUNT_FIELD]: new FormGroup({
                    [NEW_BANK_ACCOUNT_SEARCH_FIELD]: new FormControl(''),
                    [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: testFormControl,
                    [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: new FormControl('', [Validators.required]),
                    [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: new FormControl('', [Validators.required]),
                    [NEW_BANK_ACCOUNT_ACCOUNT_FIELD]: new FormControl('', [Validators.required]),
                }),
            });

            expect(component.bankAccountNameControl).toEqual(testFormControl);
        });

        it(`should throw an error if form wasn't provided`, () => {
            component.form = undefined;
            expect(() => component.bankAccountNameControl).toThrowError(`Form wasn't provided`);
        });

        it(`should throw an error if control doesn't exist in group`, () => {
            component.form = new FormGroup({
                [NEW_BANK_ACCOUNT_FIELD]: new FormGroup({
                    [NEW_BANK_ACCOUNT_SEARCH_FIELD]: new FormControl(''),
                    [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: new FormControl('', [Validators.required]),
                    [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: new FormControl('', [Validators.required]),
                    [NEW_BANK_ACCOUNT_ACCOUNT_FIELD]: new FormControl('', [Validators.required]),
                }),
            });
            expect(() => component.bankAccountNameControl).toThrowError(
                `Form doesn't contains "${NEW_BANK_ACCOUNT_FIELD}.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}" control`
            );
        });
    });

    describe('bankSelected', () => {
        it('should patch form value', () => {
            const spyOnPatchValue = spyOn(component.form, 'patchValue').and.callThrough();

            component.bankSelected({
                correspondentAccount: 'account',
                bic: '0000000000000',
                value: 'my name',
            });

            expect(spyOnPatchValue).toHaveBeenCalledTimes(1);
            expect(spyOnPatchValue).toHaveBeenCalledWith(
                {
                    [NEW_BANK_ACCOUNT_FIELD]: {
                        [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: 'my name',
                        [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: '0000000000000',
                        [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: 'account',
                    },
                },
                { emitEvent: true }
            );
        });
    });
});
