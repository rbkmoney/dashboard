import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService, TranslocoTestingModule } from '@ngneat/transloco';
import { deepEqual, instance, mock, verify } from 'ts-mockito';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    let mockMatSnackBar: MatSnackBar;
    let service: NotificationService;

    beforeEach(() => {
        mockMatSnackBar = mock(MatSnackBar);
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        en: {
                            notification: {
                                ok: 'OK',
                                error: 'Что-то пошло не так',
                                success: 'Успешно',
                                httpError: 'Произошла ошибка в процессе передачи / получения данных',
                                unknownError: 'Неизвестная ошибка',
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
                NotificationService,
                {
                    provide: MatSnackBar,
                    useValue: instance(mockMatSnackBar),
                },
            ],
        });

        service = TestBed.inject(NotificationService);
        await TestBed.inject(TranslocoService).load('en').toPromise();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('success', () => {
        it('should open success snackbar', () => {
            service.success();

            verify(mockMatSnackBar.open('Успешно', 'OK', deepEqual({ duration: 3000 }))).once();
            expect().nothing();
        });
    });

    describe('error', () => {
        it('should open error snackbar', () => {
            service.error();

            verify(mockMatSnackBar.open('Что-то пошло не так', 'OK', deepEqual({ duration: 3000 }))).once();
            expect().nothing();
        });
    });
});
