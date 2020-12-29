import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { InvoicesSearchFiltersStore } from './invoices-search-filters-store.service';

describe('InvoicesSearchFiltersStore', () => {
    let service: InvoicesSearchFiltersStore;
    let mockRouter: Router;
    let mockActivatedRoute: ActivatedRoute;

    beforeEach(() => {
        mockRouter = mock(Router);
        mockActivatedRoute = mock(ActivatedRoute);
    });

    beforeEach(() => {
        when(mockActivatedRoute.queryParams).thenReturn(of({}));
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InvoicesSearchFiltersStore,
                {
                    provide: Router,
                    useFactory: () => instance(mockRouter),
                },
                {
                    provide: ActivatedRoute,
                    useFactory: () => instance(mockActivatedRoute),
                },
            ],
        });
        service = TestBed.inject(InvoicesSearchFiltersStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('mapToData', () => {
        it('should format query params to filters data as is', () => {
            const params = { fromTime: 'test', toTime: 'test', shopIDs: ['test'], invoiceIDs: ['test'] };

            expect(service.mapToData(params)).toEqual(params);
        });

        it('should format query params to filters data and wrap shopIDs and invoiceIDs into array', () => {
            const params = { fromTime: 'test', toTime: 'test', shopIDs: 'test', invoiceIDs: 'test' };

            expect(service.mapToData(params)).toEqual({
                fromTime: 'test',
                toTime: 'test',
                shopIDs: ['test'],
                invoiceIDs: ['test'],
            });
        });
    });

    describe('mapToParams', () => {
        it('should format filters data to query params as is', () => {
            const filterData = { fromTime: 'test', toTime: 'test' };

            expect(service.mapToData(filterData)).toEqual(filterData);
        });
    });
});
