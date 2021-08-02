import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { instance, mock, verify, when } from 'ts-mockito';

import { ApiShopsService } from '@dsh/api/shop';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ShopActionResult } from '../../types/shop-action-result';
import { ShopActionsService } from './shop-actions.service';

describe('ShopActionsService', () => {
    let service: ShopActionsService;
    let mockMatDialog: MatDialog;
    let mockSnackbar: MatSnackBar;
    let mockApiShopsService: ApiShopsService;
    let mockDialogRef: MatDialogRef<ConfirmActionDialogComponent>;

    beforeEach(() => {
        mockMatDialog = mock(MatDialog);
        mockSnackbar = mock(MatSnackBar);
        mockApiShopsService = mock(ApiShopsService);
        mockDialogRef = mock<MatDialogRef<ConfirmActionDialogComponent>>(MatDialogRef);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        en: {
                            suspend: {
                                success: 'success suspend',
                                error: 'error suspend',
                            },
                            activate: {
                                success: 'success activate',
                                error: 'error activate',
                            },
                        },
                    },
                    {
                        availableLangs: ['en'],
                        defaultLang: 'en',
                    }
                ),
            ],
            providers: [
                ShopActionsService,
                {
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
                },
                {
                    provide: MatSnackBar,
                    useFactory: () => instance(mockSnackbar),
                },
                {
                    provide: ApiShopsService,
                    useFactory: () => instance(mockApiShopsService),
                },
            ],
        });
        service = TestBed.inject(ShopActionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('suspend', () => {
        beforeEach(() => {
            when(mockDialogRef.afterClosed()).thenReturn(of(null));
            when(mockMatDialog.open(ConfirmActionDialogComponent)).thenReturn(instance(mockDialogRef));
            when(mockApiShopsService.suspendShop('my_id')).thenReturn(of(null));
            when(
                mockSnackbar.open('success suspend', 'OK', {
                    duration: 3000,
                })
            );
            when(
                mockSnackbar.open('error suspend', 'OK', {
                    duration: 3000,
                })
            );
        });

        afterEach(() => {
            // ts mockito not work properly with jasmine expectations so we need to make expect like that
            expect().nothing();
        });

        it('should open confirm component dialog', () => {
            service.suspend('my_id');

            verify(mockMatDialog.open(ConfirmActionDialogComponent)).once();
        });

        it('should make request to api shops if dialog was confirmed', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('confirm'));

            service.suspend('my_id').subscribe();

            verify(mockApiShopsService.suspendShop('my_id')).once();
        });

        it('should not make request to api shops if dialog was not confirmed', () => {
            service.suspend('my_id').subscribe();

            verify(mockApiShopsService.suspendShop('my_id')).never();
        });

        it('should show success snack bar if api operation was successful', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('confirm'));

            expect(service.suspend('my_id')).toBeObservable(
                cold('(a|)', {
                    a: ShopActionResult.Success,
                })
            );
        });

        it('should show error snack bar if api operation was failed', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('confirm'));
            when(mockApiShopsService.suspendShop('my_id')).thenReturn(
                of(null).pipe(
                    map(() => {
                        throw new Error(`[TEST_ERROR]: Error in observable`);
                    })
                )
            );

            expect(service.suspend('my_id')).toBeObservable(
                cold('(a|)', {
                    a: ShopActionResult.Error,
                })
            );
        });
    });

    describe('activate', () => {
        beforeEach(() => {
            when(mockDialogRef.afterClosed()).thenReturn(of(null));
            when(mockMatDialog.open(ConfirmActionDialogComponent)).thenReturn(instance(mockDialogRef));
            when(mockApiShopsService.activateShop('my_id')).thenReturn(of(null));
            when(
                mockSnackbar.open('success activate', 'OK', {
                    duration: 3000,
                })
            );
            when(
                mockSnackbar.open('error activate', 'OK', {
                    duration: 3000,
                })
            );
        });

        afterEach(() => {
            // ts mockito not work properly with jasmine expectations so we need to make expect like that
            expect().nothing();
        });

        it('should open confirm component dialog', () => {
            service.suspend('my_id');

            verify(mockMatDialog.open(ConfirmActionDialogComponent)).once();
        });

        it('should make request to api shops if dialog was confirmed', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('confirm'));

            service.activate('my_id').subscribe();

            verify(mockApiShopsService.activateShop('my_id')).once();
        });

        it('should not make request to api shops if dialog was not confirmed', () => {
            service.activate('my_id').subscribe();

            verify(mockApiShopsService.activateShop('my_id')).never();
        });

        it('should show success snack bar if api operation was successful', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('confirm'));

            expect(service.activate('my_id')).toBeObservable(
                cold('(a|)', {
                    a: ShopActionResult.Success,
                })
            );
        });

        it('should show error snack bar if api operation was failed', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('confirm'));
            when(mockApiShopsService.activateShop('my_id')).thenReturn(
                of(null).pipe(
                    map(() => {
                        throw new Error(`[TEST_ERROR]: Error in observable`);
                    })
                )
            );

            expect(service.activate('my_id')).toBeObservable(
                cold('(a|)', {
                    a: ShopActionResult.Error,
                })
            );
        });
    });
});
