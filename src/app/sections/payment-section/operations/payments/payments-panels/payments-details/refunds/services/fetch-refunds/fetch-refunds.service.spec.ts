import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';

import { RefundSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { DEBOUNCE_ACTION_TIME } from '../../../../../consts';
import { FetchRefundsService } from './fetch-refunds.service';

describe('FetchRefundsService', () => {
    let service: FetchRefundsService;
    let mockRefundSearchService: RefundSearchService;

    beforeEach(() => {
        mockRefundSearchService = mock(RefundSearchService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FetchRefundsService,
                {
                    provide: RefundSearchService,
                    useFactory: () => instance(mockRefundSearchService),
                },
                {
                    provide: SEARCH_LIMIT,
                    useValue: 2,
                },
                {
                    provide: DEBOUNCE_ACTION_TIME,
                    useValue: 0,
                },
            ],
        });
        service = TestBed.inject(FetchRefundsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
