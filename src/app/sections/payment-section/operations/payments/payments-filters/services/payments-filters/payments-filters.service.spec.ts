import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import moment from 'moment';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';

import { PaymentsFiltersStoreService } from '../payments-filters-store/payments-filters-store.service';
import { PaymentsFiltersService } from './payments-filters.service';

describe('PaymentsFiltersService', () => {
    let service: PaymentsFiltersService;
    let mockDaterangeManagerService: DaterangeManagerService;
    let mockPaymentsFiltersStoreService: PaymentsFiltersStoreService;

    beforeEach(() => {
        mockDaterangeManagerService = mock(DaterangeManagerService);
        mockPaymentsFiltersStoreService = mock(PaymentsFiltersStoreService);
    });

    function configureTestingModule() {
        TestBed.configureTestingModule({
            providers: [
                PaymentsFiltersService,
                {
                    provide: DaterangeManagerService,
                    useFactory: () => instance(mockDaterangeManagerService),
                },
                {
                    provide: PaymentsFiltersStoreService,
                    useFactory: () => instance(mockPaymentsFiltersStoreService),
                },
            ],
        });
        service = TestBed.inject(PaymentsFiltersService);
    }

    describe('creation', () => {
        it('should be created', () => {
            const defaultDateRange = {
                begin: moment(),
                end: moment(),
            };

            when(mockDaterangeManagerService.defaultDaterange).thenReturn(defaultDateRange);
            when(mockPaymentsFiltersStoreService.data$).thenReturn(of({}));

            configureTestingModule();
            expect(service).toBeTruthy();
        });
    });

    describe('constructor', () => {
        const defaultDateRange = {
            begin: moment(),
            end: moment(),
        };

        beforeEach(() => {
            when(mockDaterangeManagerService.defaultDaterange).thenReturn(defaultDateRange);
        });

        it('should merge default daterange and query params data', () => {
            when(mockPaymentsFiltersStoreService.data$).thenReturn(
                of({
                    shopIDs: [],
                })
            );

            const expected$ = cold('(a|)', {
                a: {
                    daterange: defaultDateRange,
                    shopIDs: [],
                },
            });

            configureTestingModule();

            expect(service.filtersData$).toBeObservable(expected$);
        });

        it('should rewrite default daterange with query params data', () => {
            const storeDaterange = {
                begin: moment().startOf('m'),
                end: moment().endOf('m'),
            };

            when(mockPaymentsFiltersStoreService.data$).thenReturn(
                of({
                    daterange: storeDaterange,
                    shopIDs: [],
                })
            );

            const expected$ = cold('(a|)', {
                a: {
                    daterange: storeDaterange,
                    shopIDs: [],
                },
            });

            configureTestingModule();

            expect(service.filtersData$).toBeObservable(expected$);
        });

        it('should use default daterange if query params data has none', () => {
            when(mockPaymentsFiltersStoreService.data$).thenReturn(
                of({
                    shopIDs: ['shop-id'],
                    invoiceIDs: ['invoice-id'],
                })
            );

            const expected$ = cold('(a|)', {
                a: {
                    daterange: defaultDateRange,
                    shopIDs: ['shop-id'],
                    invoiceIDs: ['invoice-id'],
                },
            });

            configureTestingModule();

            expect(service.filtersData$).toBeObservable(expected$);
        });
    });

    describe('changeFilters', () => {
        const defaultDateRange = {
            begin: moment(),
            end: moment(),
        };

        beforeEach(() => {
            when(mockDaterangeManagerService.defaultDaterange).thenReturn(defaultDateRange);
            when(mockPaymentsFiltersStoreService.data$).thenReturn(
                of({
                    shopIDs: [],
                })
            );
        });

        it('should update properties of existing filters data', () => {
            configureTestingModule();

            service.changeFilters({
                shopIDs: ['mine'],
            });

            verify(
                mockPaymentsFiltersStoreService.preserve(
                    deepEqual({
                        daterange: defaultDateRange,
                        shopIDs: ['mine'],
                    })
                )
            ).once();
            expect().nothing();
        });
    });
});
