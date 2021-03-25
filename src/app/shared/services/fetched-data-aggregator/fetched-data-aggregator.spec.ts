import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import moment from 'moment';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { DEFAULT_UPDATE_DELAY_TOKEN, SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { IndicatorsPartialFetcher } from '../../../sections/partial-fetcher';
import { FetchFn } from '../../../sections/partial-fetcher/fetch-fn';
import { ErrorService } from '../error';
import { DataCachingService } from './data-caching.service';
import { FetchedDataAggregator } from './fetched-data-aggregator';
import { generateDatasetItems } from './generate-dataset-items';

describe('FetchedDataAggregator', () => {
    class FetchedDataAggregatored extends FetchedDataAggregator<any, any> {}
    class DataCached extends DataCachingService<any> {}
    class IndicatorsPartialFetched extends IndicatorsPartialFetcher<any, any> {
        protected fetch(...args): ReturnType<FetchFn<any, any>> {
            return undefined;
        }
    }

    let service: FetchedDataAggregatored;
    let mockIndicatorsPartialFetched: IndicatorsPartialFetched;
    let mockCachingService: DataCached;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockCachingService = mock(DataCached);
        mockErrorService = mock(ErrorService);
        mockIndicatorsPartialFetched = mock(IndicatorsPartialFetched);
    });

    beforeEach(() => {
        when(mockIndicatorsPartialFetched.searchResult$).thenReturn(of());
        when(mockIndicatorsPartialFetched.errors$).thenReturn(of());
    });

    function createService() {
        TestBed.configureTestingModule({
            providers: [
                FetchedDataAggregatored,
                {
                    provide: IndicatorsPartialFetcher,
                    useFactory: () => instance(mockIndicatorsPartialFetched),
                },
                {
                    provide: DataCachingService,
                    useFactory: () => instance(mockCachingService),
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

    describe('constructor', () => {
        describe('list$', () => {
            it('should return cached items', () => {
                const mockItems = {
                    a: generateDatasetItems(2),
                    b: generateDatasetItems(4),
                    c: [],
                };
                const cachedValues$ = cold('a--b--(c|)', mockItems);
                when(mockCachingService.items$).thenReturn(cachedValues$);

                createService();

                expect(service.list$).toBeObservable(cachedValues$);
            });
        });

        describe('isLoading$', () => {
            it('should tick true value on search', () => {
                hot('^---(a|)').subscribe(() => {
                    service.search({
                        date: {
                            begin: moment(),
                            end: moment(),
                        },
                    });
                });

                createService();

                expect(service.isLoading$).toBeObservable(
                    cold('a---b', {
                        a: false,
                        b: true,
                    })
                );
            });

            it('should tick true value on refresh', () => {
                hot('^---(a|)').subscribe(() => {
                    service.refresh();
                });

                createService();

                expect(service.isLoading$).toBeObservable(
                    cold('a---b', {
                        a: false,
                        b: true,
                    })
                );
            });

            it('should tick true value on load more', () => {
                hot('^---(a|)').subscribe(() => {
                    service.loadMore();
                });

                createService();

                expect(service.isLoading$).toBeObservable(
                    cold('a---b', {
                        a: false,
                        b: true,
                    })
                );
            });

            it('should tick false when cached updated', () => {
                hot('^---(a|)').subscribe(() => {
                    service.loadMore();
                });

                when(mockIndicatorsPartialFetched.searchResult$).thenReturn(
                    hot('^------(a|)', {
                        a: generateDatasetItems(2),
                    })
                );

                createService();

                expect(service.isLoading$).toBeObservable(
                    cold('a---b--c', {
                        a: false,
                        b: true,
                        c: false,
                    })
                );
            });
        });

        describe('lastUpdated$', () => {
            it('should return fetching update date', () => {
                const updateDate$ = cold('a-----(b|)', {
                    a: new Date('December 23, 2020 03:24:00').toString(),
                    b: new Date().toString(),
                });
                when(mockIndicatorsPartialFetched.lastUpdated$).thenReturn(updateDate$);

                createService();

                expect(service.lastUpdated$).toBeObservable(updateDate$);
            });
        });

        describe('hasMore$', () => {
            it('should return fetching has more status', () => {
                const hasMore$ = cold('a-----(b|)', {
                    a: true,
                    b: false,
                });
                when(mockIndicatorsPartialFetched.hasMore$).thenReturn(hasMore$);

                createService();

                expect(service.hasMore$).toBeObservable(hasMore$);
            });
        });

        describe('caching fetched data', () => {
            it('should slice items from fetcher using search limit and send it to cache service', () => {
                const mockItems = generateDatasetItems(7);

                when(mockIndicatorsPartialFetched.searchResult$).thenReturn(
                    of(mockItems.slice(0, 2), mockItems.slice(0, 4), mockItems.slice(0, 6), mockItems.slice())
                );

                createService();

                verify(mockCachingService.addElements(...mockItems.slice(0, 2).map(deepEqual))).once();
                verify(mockCachingService.addElements(...mockItems.slice(2, 4).map(deepEqual))).once();
                verify(mockCachingService.addElements(...mockItems.slice(4, 6).map(deepEqual))).once();
                verify(mockCachingService.addElements(...mockItems.slice(5).map(deepEqual))).once();
                expect().nothing();
            });
        });

        describe('handling fetching errors', () => {
            it('should provide all errors from fetcher to error service', () => {
                const errorsValues = {
                    a: new Error('mine_error'),
                    b: new Error('another_error'),
                };

                when(mockIndicatorsPartialFetched.errors$).thenReturn(of(errorsValues.a, errorsValues.b));

                createService();

                verify(mockErrorService.error(deepEqual(errorsValues.a))).once();
                verify(mockErrorService.error(deepEqual(errorsValues.b))).once();
                expect().nothing();
            });
        });
    });

    describe('search', () => {
        beforeEach(() => {
            createService();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should proxy request to fetcher', () => {
            const searchParams = {
                date: {
                    begin: moment(),
                    end: moment(),
                },
            };

            service.search(searchParams);
            verify(mockIndicatorsPartialFetched.search(deepEqual(searchParams))).once();
        });

        it('should clear cache', () => {
            service.search({
                date: {
                    begin: moment(),
                    end: moment(),
                },
            });

            verify(mockCachingService.clear()).once();
        });
    });

    describe('refresh', () => {
        beforeEach(() => {
            createService();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should call fetcher refresh method', () => {
            service.refresh();

            verify(mockIndicatorsPartialFetched.refresh()).once();
        });

        it('should clear cache', () => {
            service.refresh();

            verify(mockCachingService.clear()).once();
        });
    });

    describe('loadMore', () => {
        beforeEach(() => {
            createService();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should request fetch more from fetcher', () => {
            service.loadMore();

            verify(mockIndicatorsPartialFetched.fetchMore()).once();
        });

        it('should not clear cache', () => {
            service.loadMore();

            verify(mockCachingService.clear()).never();
        });
    });
});
