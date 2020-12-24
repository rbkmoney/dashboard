import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';

import { Invoice } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { InvoiceSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/constants';

import { FetchInvoicesService } from './fetch-invoices.service';

class MockActivatedRoute {
    params: Observable<Params> = of({ realm: PaymentInstitutionRealm.test });
}

class MockInvoiceSearchService {
    invoices$: Observable<Invoice[]>;
    private innerInvoices$ = new ReplaySubject<Invoice[]>(1);
    private mockInvoices: Invoice[];

    constructor() {
        this.invoices$ = this.innerInvoices$.asObservable();
    }

    searchInvoices(): Observable<Invoice[]> {
        this.innerInvoices$.next(this.mockInvoices);
        return of(this.mockInvoices);
    }

    setMockInvoices(invoices: Invoice[]) {
        this.mockInvoices = invoices;
    }
}

describe('FetchInvoicesService', () => {
    let service: FetchInvoicesService;
    let invoiceSearchService: MockInvoiceSearchService;
    let activatedRoute: MockActivatedRoute;

    beforeEach(() => {
        invoiceSearchService = new MockInvoiceSearchService();
        activatedRoute = new MockActivatedRoute();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FetchInvoicesService,
                {
                    provide: InvoiceSearchService,
                    useValue: invoiceSearchService,
                },
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoute,
                },
                {
                    provide: SEARCH_LIMIT,
                    useValue: 5,
                },
            ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(FetchInvoicesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // it('should fetch invoices', () => {
    //     invoiceSearchService.setMockInvoices(generateMockInvoiceList(2));
    //
    //     const expectedInvoices$ = cold('a', {
    //         a: ['mock_invoice_0', 'mock_invoice_1']
    //     });
    //
    //     service.search({ fromTime: '', toTime: '' });
    //
    //     expect(
    //         service.searchResult$.pipe(
    //             map(list => list.map(({ id }) => id))
    //         )
    //     ).toBeObservable(expectedInvoices$);
    // });
});
