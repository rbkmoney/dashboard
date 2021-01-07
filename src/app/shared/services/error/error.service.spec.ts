import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@ngneat/transloco';
import { instance, mock, verify } from 'ts-mockito';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { NotificationService } from '../notification';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
    let mockNotificationService: NotificationService;
    let service: ErrorService;

    beforeEach(() => {
        mockNotificationService = mock(NotificationService);
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            providers: [
                ErrorService,
                {
                    provide: NotificationService,
                    useFactory: () => instance(mockNotificationService),
                },
            ],
        });

        service = TestBed.inject(ErrorService);
        await TestBed.inject(TranslocoService).load('ru').toPromise();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('error', () => {
        afterEach(() => {
            expect().nothing();
        });

        it('error without message', () => {
            service.error('error');
            verify(mockNotificationService.error(undefined)).once();
        });

        it('error with message', () => {
            service.error('error', 'error message');
            verify(mockNotificationService.error('error message')).once();
        });

        it('should parse type errors and show common error', () => {
            try {
                let a;
                a['mine-property'] = null;
                a = {};
            } catch (e) {
                service.error(e, 'error message');
            }

            verify(mockNotificationService.error('Что-то пошло не так')).once();
        });
    });
});
