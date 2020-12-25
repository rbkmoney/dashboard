import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { cold } from 'jasmine-marbles';
import * as moment from 'moment';
import { Moment } from 'moment';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentSearchResult, Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { PaymentSearchService } from '@dsh/api/search';
import { ApiShopsService } from '@dsh/api/shop';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { DEBOUNCE_ACTION_TIME } from '../../consts';
import { FetchPaymentsService } from './fetch-payments.service';

describe('FetchPaymentsService', () => {
    let service: FetchPaymentsService;
    let mockPaymentSearchService: PaymentSearchService;
    let mockApiShopsService: ApiShopsService;
    let mockMatSnackBar: MatSnackBar;

    function makeTestingModule() {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        ru: {
                            httpError: 'Произошла ошибка в процессе передачи / получения данных',
                        },
                    },
                    {
                        availableLangs: ['ru'],
                        defaultLang: 'ru',
                    }
                ),
            ],
            providers: [
                FetchPaymentsService,
                {
                    provide: PaymentSearchService,
                    useFactory: () => instance(mockPaymentSearchService),
                },
                {
                    provide: ApiShopsService,
                    useFactory: () => instance(mockApiShopsService),
                },
                {
                    provide: MatSnackBar,
                    useFactory: () => instance(mockMatSnackBar),
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
        service = TestBed.inject(FetchPaymentsService);
    }

    beforeEach(() => {
        mockPaymentSearchService = mock(PaymentSearchService);
        mockApiShopsService = mock(ApiShopsService);
        mockMatSnackBar = mock(MatSnackBar);
    });

    beforeEach(() => {
        makeTestingModule();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('init loading', () => {
        let dateRange: [Moment, Moment];

        beforeEach(() => {
            dateRange = [moment().startOf('month'), moment().endOf('month')];
        });

        it('should load only after realm was provided', () => {
            when(
                mockPaymentSearchService.searchPayments(
                    dateRange[0].utc().format(),
                    dateRange[1].utc().format(),
                    deepEqual({
                        paymentInstitutionRealm: PaymentInstitutionRealm.live,
                        paymentAmountFrom: undefined,
                        paymentAmountTo: undefined,
                    }),
                    2,
                    undefined
                )
            ).thenReturn(of({ result: [] }));

            service.search({
                date: {
                    begin: dateRange[0],
                    end: dateRange[1],
                },
            });

            jasmine.clock().install();

            jasmine.clock().tick(3000);

            service.initRealm(PaymentInstitutionRealm.live);

            jasmine.clock().uninstall();

            verify(
                mockPaymentSearchService.searchPayments(
                    dateRange[0].utc().format(),
                    dateRange[1].utc().format(),
                    deepEqual({
                        paymentInstitutionRealm: PaymentInstitutionRealm.live,
                        paymentAmountFrom: undefined,
                        paymentAmountTo: undefined,
                    }),
                    2,
                    undefined
                )
            ).once();
            expect().nothing();
        });

        it('should load after search was called', () => {
            when(
                mockPaymentSearchService.searchPayments(
                    dateRange[0].utc().format(),
                    dateRange[1].utc().format(),
                    deepEqual({
                        paymentInstitutionRealm: PaymentInstitutionRealm.test,
                        paymentAmountFrom: undefined,
                        paymentAmountTo: undefined,
                    }),
                    2,
                    undefined
                )
            ).thenReturn(of({ result: [] }));

            service.initRealm(PaymentInstitutionRealm.test);

            jasmine.clock().install();

            jasmine.clock().tick(3000);

            service.search({
                date: {
                    begin: dateRange[0],
                    end: dateRange[1],
                },
            });

            jasmine.clock().uninstall();

            verify(
                mockPaymentSearchService.searchPayments(
                    dateRange[0].utc().format(),
                    dateRange[1].utc().format(),
                    deepEqual({
                        paymentInstitutionRealm: PaymentInstitutionRealm.test,
                        paymentAmountFrom: undefined,
                        paymentAmountTo: undefined,
                    }),
                    2,
                    undefined
                )
            ).once();
            expect().nothing();
        });
    });

    describe('paymentsList$', () => {
        it('should combine shops data and payments data', () => {
            const dateRange = [moment().startOf('month'), moment().endOf('month')];
            const responseList = new Array(2)
                .fill({
                    id: '',
                    shopID: '',
                    amount: 20,
                    currency: 'USD',
                    status: PaymentSearchResult.StatusEnum.Pending,
                    invoiceID: 'invoiceID',
                    createdAt: new Date(),
                    payer: null,
                    flow: null,
                    statusChangedAt: dateRange[0].utc().format(),
                })
                .map((el: PaymentSearchResult, index: number) => {
                    return {
                        ...el,
                        id: `payment_id_${index}`,
                        shopID: `my_shop_id_${index}`,
                    };
                });
            const shopsList = new Array(2)
                .fill({
                    id: '',
                    createdAt: new Date(),
                    isBlocked: false,
                    isSuspended: false,
                    categoryID: 1,
                    location: {
                        locationType: 'type',
                    },
                    details: {
                        name: '',
                    },
                    contractID: 'contractID',
                    payoutToolID: 'payoutToolID',
                    scheduleID: 1,
                    account: {
                        currency: 'USD',
                        guaranteeID: 2,
                        settlementID: 2,
                    },
                })
                .map((el: Shop, index: number) => {
                    return {
                        ...el,
                        id: `my_shop_id_${index}`,
                        details: {
                            name: `my_name_${index}`,
                        },
                    };
                });

            when(mockApiShopsService.shops$).thenReturn(of(shopsList));
            when(
                mockPaymentSearchService.searchPayments(
                    dateRange[0].utc().format(),
                    dateRange[1].utc().format(),
                    deepEqual({
                        paymentInstitutionRealm: PaymentInstitutionRealm.test,
                        paymentAmountFrom: undefined,
                        paymentAmountTo: undefined,
                    }),
                    2,
                    undefined
                )
            ).thenReturn(
                of({
                    result: responseList,
                } as any)
            );

            makeTestingModule();

            service.initRealm(PaymentInstitutionRealm.test);
            service.search({
                date: {
                    begin: dateRange[0],
                    end: dateRange[1],
                },
            });

            const expected$ = cold('a', {
                a: [
                    {
                        amount: 20,
                        currency: 'USD',
                        status: PaymentSearchResult.StatusEnum.Pending,
                        statusChangedAt: dateRange[0].utc().format(),
                        invoiceID: 'invoiceID',
                        shopName: 'my_name_0',
                        paymentID: 'payment_id_0',
                        fee: 0,
                        externalID: undefined,
                        error: undefined,
                        transactionInfo: undefined,
                        payer: null,
                    },
                    {
                        amount: 20,
                        currency: 'USD',
                        status: PaymentSearchResult.StatusEnum.Pending,
                        statusChangedAt: dateRange[0].utc().format(),
                        invoiceID: 'invoiceID',
                        shopName: 'my_name_1',
                        paymentID: 'payment_id_1',
                        fee: 0,
                        externalID: undefined,
                        error: undefined,
                        transactionInfo: undefined,
                        payer: null,
                    },
                ],
            });

            expect(service.paymentsList$).toBeObservable(expected$);
        });
    });
});
