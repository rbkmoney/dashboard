import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { DEFAULT_UPDATE_DELAY_TOKEN, SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared/services';
import { DataCachingService } from '@dsh/app/shared/services/list/data-caching.service';
import { FetchedDataAggregator } from '@dsh/app/shared/services/list/fetched-data-aggregator';

import { IndicatorsPartialFetcher } from '../../../sections/partial-fetcher';
import { FetchFn } from '../../../sections/partial-fetcher/fetch-fn';

describe('FetchedDataAggregator', () => {
    class FetchedDataAggregatored extends FetchedDataAggregator<any, any> {}
    class DataCached extends DataCachingService<any> {}
    class IndicatorsPartialFetched extends IndicatorsPartialFetcher<any, any> {
        protected fetch(...args): ReturnType<FetchFn<any, any>> {
            return undefined;
        }
    }

    let service: FetchedDataAggregatored;
    let indicatorsPartialFetched: IndicatorsPartialFetched;
    let mockPaymentsCachingService: DataCached;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockPaymentsCachingService = mock(DataCached);
        mockErrorService = mock(ErrorService);
        indicatorsPartialFetched = mock(IndicatorsPartialFetched);
    });

    beforeEach(() => {
        when(indicatorsPartialFetched.searchResult$).thenReturn(of());
        when(indicatorsPartialFetched.errors$).thenReturn(of());
    });

    function createService() {
        TestBed.configureTestingModule({
            providers: [
                FetchedDataAggregatored,
                {
                    provide: IndicatorsPartialFetcher,
                    useFactory: () => instance(indicatorsPartialFetched),
                },
                {
                    provide: DataCached,
                    useFactory: () => instance(mockPaymentsCachingService),
                },
                {
                    provide: ErrorService,
                    useFactory: () => instance(mockErrorService),
                },
                {
                    provide: SEARCH_LIMIT,
                    useValue: 2,
                },
                {
                    provide: DEFAULT_UPDATE_DELAY_TOKEN,
                    useValue: 100,
                },
            ],
        });
        service = TestBed.inject(FetchedDataAggregatored);
    }

    it('should be created', () => {
        createService();
        expect(service).toBeTruthy();
    });
});
