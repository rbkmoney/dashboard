import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { generateMockInvoiceList } from '../../tests/generate-mock-invoice-list';
import { FetchInvoicesService } from '../fetch-invoices/fetch-invoices.service';
import { InvoicesExpandedIdManager } from './invoices-expanded-id-manager.service';

describe('InvoicesExpandedIdManager', () => {
    let service: InvoicesExpandedIdManager;
    let mockFetchInvoicesService: FetchInvoicesService;
    let mockActivatedRoute: ActivatedRoute;

    beforeEach(() => {
        mockFetchInvoicesService = mock(FetchInvoicesService);
        mockActivatedRoute = mock(ActivatedRoute);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                InvoicesExpandedIdManager,
                {
                    provide: FetchInvoicesService,
                    useFactory: () => instance(mockFetchInvoicesService),
                },
                {
                    provide: ActivatedRoute,
                    useFactory: () => instance(mockActivatedRoute),
                },
            ],
        });
    });

    it('should be created', () => {
        when(mockActivatedRoute.fragment).thenReturn(of('test'));
        service = TestBed.inject(InvoicesExpandedIdManager);
        expect(service).toBeTruthy();
    });

    describe('expandedId$', () => {
        it('should return index position in shops list using fragment id', () => {
            when(mockFetchInvoicesService.searchResult$).thenReturn(of(generateMockInvoiceList(3)));
            when(mockActivatedRoute.fragment).thenReturn(of('mock_invoice_1'));
            service = TestBed.inject(InvoicesExpandedIdManager);

            expect(service.expandedId$).toBeObservable(
                cold('(a|)', {
                    a: 1,
                })
            );
        });

        it('should return -1 if items was not found in list', () => {
            when(mockFetchInvoicesService.searchResult$).thenReturn(of(generateMockInvoiceList(3)));
            when(mockActivatedRoute.fragment).thenReturn(of(''));
            service = TestBed.inject(InvoicesExpandedIdManager);

            expect(service.expandedId$).toBeObservable(
                cold('(a|)', {
                    a: -1,
                })
            );
        });

        it('should return -1 if list is empty', () => {
            when(mockFetchInvoicesService.searchResult$).thenReturn(of([]));
            when(mockActivatedRoute.fragment).thenReturn(of('test'));
            service = TestBed.inject(InvoicesExpandedIdManager);

            expect(service.expandedId$).toBeObservable(
                cold('(a|)', {
                    a: -1,
                })
            );
        });
    });
});
