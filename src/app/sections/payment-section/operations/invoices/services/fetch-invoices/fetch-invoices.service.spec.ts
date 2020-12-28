import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { InvoiceSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/constants';

import { generateMockInvoiceList } from '../../tests/generate-mock-invoice-list';
import { FetchInvoicesService } from './fetch-invoices.service';

describe('FetchInvoicesService', () => {
    let service: FetchInvoicesService;
    let invoiceSearchService: InvoiceSearchService;
    let mockActivatedRoute: ActivatedRoute;

    beforeEach(() => {
        invoiceSearchService = mock(InvoiceSearchService);
        mockActivatedRoute = mock(ActivatedRoute);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FetchInvoicesService,
                {
                    provide: InvoiceSearchService,
                    useFactory: () => instance(invoiceSearchService),
                },
                {
                    provide: ActivatedRoute,
                    useFactory: () => instance(mockActivatedRoute),
                },
                {
                    provide: SEARCH_LIMIT,
                    useValue: 5,
                },
            ],
        });
    });

    beforeEach(() => {
        when(mockActivatedRoute.params).thenReturn(of({ realm: PaymentInstitutionRealm.test }));
        service = TestBed.inject(FetchInvoicesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('searchResult$', () => {
        it('should fetch invoices', (done) => {
            when(
                invoiceSearchService.searchInvoices(
                    '',
                    '',
                    deepEqual({ paymentInstitutionRealm: 'test' }),
                    5,
                    undefined
                )
            ).thenReturn(of({ result: generateMockInvoiceList(2) }));

            service.searchResult$.pipe(take(1)).subscribe((res) => {
                expect(res).toEqual(generateMockInvoiceList(2));
                done();
            });

            service.search({ fromTime: '', toTime: '' });
        });

        it('should fetch and show more', (done) => {
            when(
                invoiceSearchService.searchInvoices(
                    '',
                    '',
                    deepEqual({ paymentInstitutionRealm: 'test' }),
                    5,
                    undefined
                )
            ).thenReturn(of({ result: generateMockInvoiceList(5), continuationToken: 'token' }));

            when(
                invoiceSearchService.searchInvoices('', '', deepEqual({ paymentInstitutionRealm: 'test' }), 5, 'token')
            ).thenReturn(of({ result: generateMockInvoiceList(2, 5) }));

            let count = 0;
            service.searchResult$.pipe(take(2)).subscribe((res) => {
                switch (count) {
                    case 0:
                        expect(res).toEqual(generateMockInvoiceList(5));
                        service.fetchMore();
                        break;
                    case 1:
                        expect(res).toEqual(generateMockInvoiceList(7));
                        done();
                        break;
                }
                count += 1;
            });

            service.search({ fromTime: '', toTime: '' });
        });
    });

    describe('isLoading$', () => {
        it('should trigger isLoading', (done) => {
            when(
                invoiceSearchService.searchInvoices(
                    '',
                    '',
                    deepEqual({ paymentInstitutionRealm: 'test' }),
                    5,
                    undefined
                )
            ).thenReturn(of({ result: generateMockInvoiceList(1) }).pipe(delay(600)));

            let count = 0;
            service.isLoading$.pipe(take(2)).subscribe((d) => {
                switch (count) {
                    case 0:
                        expect(d).toBe(true);
                        break;
                    case 1:
                        expect(d).toBe(false);
                        done();
                        break;
                }
                count += 1;
            });

            service.search({ fromTime: '', toTime: '' });
        });
    });

    describe('lastUpdated$', () => {
        it('should trigger lastUpdated', (done) => {
            when(
                invoiceSearchService.searchInvoices(
                    '',
                    '',
                    deepEqual({ paymentInstitutionRealm: 'test' }),
                    5,
                    undefined
                )
            ).thenReturn(of({ result: generateMockInvoiceList(1) }));

            service.lastUpdated$.pipe(take(1)).subscribe((res) => {
                expect(res).toBe(moment().utc().format());
                done();
            });

            service.search({ fromTime: '', toTime: '' });
        });
    });
});
