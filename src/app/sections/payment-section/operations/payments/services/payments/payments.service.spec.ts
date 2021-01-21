import { TestBed } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import moment from 'moment';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { PaymentSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared/services';

import { PAYMENTS_UPDATE_DELAY_TOKEN } from '../../consts';
import { generateMockPaymentsList } from '../../tests/generate-mock-payments-list';
import { FetchPaymentsService } from '../fetch-payments/fetch-payments.service';
import { PaymentsCachingService } from '../payments-caching/payments-caching.service';
import { PaymentsService, SINGLE_PAYMENT_REQUEST_DURATION } from './payments.service';

fdescribe('PaymentsService', () => {
    let service: PaymentsService;
    let mockPaymentSearchService: PaymentSearchService;
    let mockFetchPaymentsService: FetchPaymentsService;
    let mockPaymentsCachingService: PaymentsCachingService;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockPaymentSearchService = mock(PaymentSearchService);
        mockFetchPaymentsService = mock(FetchPaymentsService);
        mockPaymentsCachingService = mock(PaymentsCachingService);
        mockErrorService = mock(ErrorService);
    });

    beforeEach(() => {
        when(mockFetchPaymentsService.paymentsList$).thenReturn(of());
        when(mockFetchPaymentsService.errors$).thenReturn(of());
    })

    function createService() {
        TestBed.configureTestingModule({
            providers: [
                PaymentsService,
                {
                    provide: PaymentSearchService,
                    useFactory: () => instance(mockPaymentSearchService),
                },
                {
                    provide: FetchPaymentsService,
                    useFactory: () => instance(mockFetchPaymentsService),
                },
                {
                    provide: PaymentsCachingService,
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
                    provide: PAYMENTS_UPDATE_DELAY_TOKEN,
                    useValue: 100,
                },
            ]
        });
        service = TestBed.inject(PaymentsService);
    }

    it('should be created', () => {
        createService();
        expect(service).toBeTruthy();
    });

    describe('constructor', () => {
        describe('paymentsList$', () => {
            it('should return cached payments', () => {
                const mockPayments = {
                    a: generateMockPaymentsList(2),
                    b: generateMockPaymentsList(4),
                    c: [],
                };
                const cachedValues$ = cold('a--b--(c|)', mockPayments);
                when(mockPaymentsCachingService.payments$).thenReturn(cachedValues$);

                createService();

                expect(service.paymentsList$).toBeObservable(cachedValues$);
            });
        });

        describe('isLoading$', () => {
            it('should return fetching status', () => {
                const loadingStatus$ = cold('a-b-----(c|)', {
                    a: false,
                    b: true,
                    c: false,
                });
                when(mockFetchPaymentsService.isLoading$).thenReturn(loadingStatus$);

                createService();

                expect(service.isLoading$).toBeObservable(loadingStatus$);
            });
        });

        describe('lastUpdated$', () => {
            it('should return fetching update date', () => {
                const updateDate$ = cold('a-----(b|)', {
                    a: new Date('December 23, 2020 03:24:00').toString(),
                    b: new Date().toString(),
                });
                when(mockFetchPaymentsService.lastUpdated$).thenReturn(updateDate$);

                createService();

                expect(service.lastUpdated$).toBeObservable(updateDate$);
            })
        });

        describe('hasMore$', () => {
            it('should return fetching has more status', () => {
                const hasMore$ = cold('a-----(b|)', {
                    a: true,
                    b: false,
                });
                when(mockFetchPaymentsService.hasMore$).thenReturn(hasMore$);

                createService();

                expect(service.hasMore$).toBeObservable(hasMore$);
            });
        });

        describe('caching fetched data', () => {
            it('should slice items from fetcher using search limit and send it to cache service', () => {
                const mockPayments = generateMockPaymentsList(7);

                when(mockFetchPaymentsService.paymentsList$).thenReturn(of(
                    mockPayments.slice(0, 2),
                    mockPayments.slice(0, 4),
                    mockPayments.slice(0, 6),
                    mockPayments.slice(),
                ));

                createService();

                verify(mockPaymentsCachingService.addElements(...mockPayments.slice(0, 2).map(deepEqual))).once();
                verify(mockPaymentsCachingService.addElements(...mockPayments.slice(2, 4).map(deepEqual))).once();
                verify(mockPaymentsCachingService.addElements(...mockPayments.slice(4, 6).map(deepEqual))).once();
                verify(mockPaymentsCachingService.addElements(...mockPayments.slice(5).map(deepEqual))).once();
                expect().nothing();
            });
        });

        describe('handling fetching errors', () => {
            it('should provide all errors from fetcher to error service', () => {
                const errorsValues = {
                    a: new Error('mine_error'),
                    b: new Error('another_error'),
                };

                when(mockFetchPaymentsService.errors$).thenReturn(of(errorsValues.a, errorsValues.b));

                createService();

                verify(mockErrorService.error(deepEqual(errorsValues.a))).once();
                verify(mockErrorService.error(deepEqual(errorsValues.b))).once();
                expect().nothing();
            });
        });
    });

    describe('initRealm', () => {
        it('should init realm in fetcher', () => {
            createService();

            service.initRealm(PaymentInstitutionRealm.live);

            verify(mockFetchPaymentsService.initRealm(PaymentInstitutionRealm.live)).once();
            expect().nothing();
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
                    end: moment()
                }
            }

            service.search(searchParams);
            verify(mockFetchPaymentsService.search(deepEqual(searchParams))).once();
        });

        it('should clear cache', () => {
            createService();

            service.search({
                date: {
                    begin: moment(),
                    end: moment()
                }
            });

            verify(mockPaymentsCachingService.clear()).once();
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

            verify(mockFetchPaymentsService.refresh()).once();
        });

        it('should clear cache', () => {
            service.refresh();

            verify(mockPaymentsCachingService.clear()).once();
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

            verify(mockFetchPaymentsService.fetchMore()).once();
        });

        it('should not clear cache', () => {
            service.loadMore();

            verify(mockPaymentsCachingService.clear()).never();
        });
    });

    xdescribe('updatePayment', () => {
        beforeEach(() => {
            createService();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should request load one element after delay', () => {
            const scheduler = getTestScheduler();

            when(mockPaymentSearchService.getPaymentByDuration(
                deepEqual(SINGLE_PAYMENT_REQUEST_DURATION),
                'my_invoice_id',
                'my_payment_id'
            )).thenReturn(of());

            scheduler.createTime('----------')
        });
    });
});
