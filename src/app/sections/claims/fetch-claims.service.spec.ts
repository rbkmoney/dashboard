import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoTestingModule } from '@ngneat/transloco';

import * as ru from '../../../assets/i18n/ru.json';
import { ClaimsService } from '../../api/claims';
import { FetchClaimsService } from './services/fetch-claims/fetch-claims.service';

class MockApiClaimsService {}

const translationConfig = {
    ru,
};

describe('FetchClaimsService', () => {
    let service: FetchClaimsService;
    let apiClaimsService: MockApiClaimsService;

    beforeEach(() => {
        apiClaimsService = new MockApiClaimsService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                TranslocoTestingModule.withLangs(translationConfig, {
                    availableLangs: ['ru'],
                    defaultLang: 'ru',
                }),
            ],
            providers: [
                FetchClaimsService,
                {
                    provide: ClaimsService,
                    useValue: apiClaimsService,
                },
            ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(FetchClaimsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
