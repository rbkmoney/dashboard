import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { cold } from 'jasmine-marbles';
import * as moment from 'moment';
import { of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
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

    it('should fetch invoices', () => {
        const expectedInvoices$ = cold('a', {
            a: ['mock_invoice_0', 'mock_invoice_1'],
        });

        when(
            invoiceSearchService.searchInvoices('', '', deepEqual({ paymentInstitutionRealm: 'test' }), 5, undefined)
        ).thenReturn(of({ result: generateMockInvoiceList(2) }));

        jasmine.clock().install();

        service.search({ fromTime: '', toTime: '' });

        jasmine.clock().tick(300);

        jasmine.clock().uninstall();

        expect(service.searchResult$.pipe(map((list) => list.map(({ id }) => id)))).toBeObservable(expectedInvoices$);
    });

    it('should fetch and show more', () => {
        const expectedInvoices$ = cold('a', {
            a: generateMockInvoiceList(7),
        });

        when(
            invoiceSearchService.searchInvoices('', '', deepEqual({ paymentInstitutionRealm: 'test' }), 5, undefined)
        ).thenReturn(of({ result: generateMockInvoiceList(5), continuationToken: 'token' }));

        when(
            invoiceSearchService.searchInvoices('', '', deepEqual({ paymentInstitutionRealm: 'test' }), 5, 'token')
        ).thenReturn(of({ result: generateMockInvoiceList(2, 5) }));

        jasmine.clock().install();

        service.search({ fromTime: '', toTime: '' });

        jasmine.clock().tick(300);

        service.fetchMore();

        jasmine.clock().tick(300);

        jasmine.clock().uninstall();

        expect(service.searchResult$).toBeObservable(expectedInvoices$);
    });

    it('should trigger isLoading', (done) => {
        when(
            invoiceSearchService.searchInvoices('', '', deepEqual({ paymentInstitutionRealm: 'test' }), 5, undefined)
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

    it('should trigger lastUpdated', () => {
        when(
            invoiceSearchService.searchInvoices('', '', deepEqual({ paymentInstitutionRealm: 'test' }), 5, undefined)
        ).thenReturn(of({ result: generateMockInvoiceList(1) }));

        jasmine.clock().install();

        service.search({ fromTime: '', toTime: '' });

        jasmine.clock().tick(300);

        jasmine.clock().uninstall();

        const expectedLastUpdated$ = cold('a', {
            // TODO: fix it with mapToTimestamp
            a: moment().utc().format(),
        });

        expect(service.lastUpdated$).toBeObservable(expectedLastUpdated$);
    });
});
