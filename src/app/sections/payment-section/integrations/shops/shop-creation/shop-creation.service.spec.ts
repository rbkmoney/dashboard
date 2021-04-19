import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentInstitutionRealm } from '@dsh/api/model/payment-institution-realm';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';
import { CreateShopDialogResponse } from './create-russian-shop-entity/types/create-shop-dialog-response';
import { ShopCreationService } from './shop-creation.service';

describe('CreateShopService', () => {
    let service: ShopCreationService;
    let mockMatDialog: MatDialog;
    let mockMatDialogRef: MatDialogRef<CreateShopDialogComponent>;
    let mockMatSnackBar: MatSnackBar;
    let transloco: TranslocoService;

    beforeEach(() => {
        mockMatDialog = mock(MatDialog);
        mockMatDialogRef = mock(MatDialogRef);
        mockMatSnackBar = mock(MatSnackBar);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            providers: [
                ShopCreationService,
                {
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
                },
                {
                    provide: MatSnackBar,
                    useFactory: () => instance(mockMatSnackBar),
                },
            ],
        });
        service = TestBed.inject(ShopCreationService);
        transloco = TestBed.inject(TranslocoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createShop', () => {
        beforeEach(() => {
            when(
                mockMatDialog.open(
                    CreateShopDialogComponent,
                    deepEqual({
                        width: '552px',
                        disableClose: true,
                        autoFocus: false,
                        data: {
                            realm: PaymentInstitutionRealm.Test,
                        },
                    })
                )
            ).thenReturn(instance(mockMatDialogRef));
            when(mockMatDialogRef.afterClosed()).thenReturn(of('canceled') as Observable<CreateShopDialogResponse>);
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should open dialog CreateShopDialogComponent with config', () => {
            service.createShop({ realm: PaymentInstitutionRealm.Test });

            verify(
                mockMatDialog.open(
                    CreateShopDialogComponent,
                    deepEqual({
                        width: '552px',
                        disableClose: true,
                        autoFocus: false,
                        data: {
                            realm: PaymentInstitutionRealm.Test,
                        },
                    })
                )
            ).once();
        });

        it('should open snackbar on send response from dialog', () => {
            when(mockMatDialogRef.afterClosed()).thenReturn(of('send') as Observable<CreateShopDialogResponse>);
            when(
                mockMatSnackBar.open(transloco.translate('russianLegalEntity.created', null, 'create-shop'), 'OK')
            ).thenReturn(null);

            service.createShop({ realm: PaymentInstitutionRealm.Test });

            verify(
                mockMatSnackBar.open(transloco.translate('russianLegalEntity.created', null, 'create-shop'), 'OK')
            ).once();
        });

        it('should do not open snackbar on canceled response from dialog', () => {
            when(
                mockMatSnackBar.open(transloco.translate('russianLegalEntity.created', null, 'create-shop'), 'OK')
            ).thenReturn(null);

            service.createShop({ realm: PaymentInstitutionRealm.Test });
            verify(
                mockMatSnackBar.open(transloco.translate('russianLegalEntity.created', null, 'create-shop'), 'OK')
            ).never();
        });
    });
});
