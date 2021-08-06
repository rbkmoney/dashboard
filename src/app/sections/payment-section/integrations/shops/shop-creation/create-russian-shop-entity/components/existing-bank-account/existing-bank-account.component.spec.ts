import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mock, verify, when } from 'ts-mockito';

import { Shop } from '@dsh/api-codegen/capi';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { generateMockShopsList } from '../../../../tests/generate-mock-shops-list';
import { ExistingBankAccountComponent } from './existing-bank-account.component';

describe('ExistingBankAccountComponent', () => {
    let component: ExistingBankAccountComponent;
    let fixture: ComponentFixture<ExistingBankAccountComponent>;

    async function makeTestingModule() {
        TestBed.resetTestingModule();
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, ReactiveFormsModule, getTranslocoModule()],
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

    describe('creation', () => {
        beforeEach(async () => {
            await makeTestingModule();
        });

        it('should create', () => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        let mockShopsList: Shop[];

        beforeEach(() => {
            mockShopsList = generateMockShopsList(15);
        });

        it('should init innerFormControl with form group value', async () => {
            await makeTestingModule();

            fixture.detectChanges();
        });

        it('should update form control on every selected change', async () => {
            const mockFormControl = mock(FormControl);

            when(mockFormControl.value).thenReturn(undefined);
            when(mockFormControl.setValue(mockShopsList[2].id)).thenReturn();
            when(mockFormControl.setValue(mockShopsList[5].id)).thenReturn();

            await makeTestingModule();

            fixture.detectChanges();

            verify(mockFormControl.setValue(mockShopsList[2].id)).once();
            verify(mockFormControl.setValue(mockShopsList[5].id)).once();
            expect().nothing();
        });
    });
});
