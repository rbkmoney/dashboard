import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { ShopsFiltersStoreService } from './shops-filters-store.service';

describe('ShopsFiltersStoreService', () => {
    let service: ShopsFiltersStoreService;
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
                ShopsFiltersStoreService,
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
        service = TestBed.inject(ShopsFiltersStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('mapToData', () => {
        it('should format query params to filters data as is', () => {
            const params = { query: 'my query' };

            expect(service.mapToData(params)).toEqual(params);
        });
    });

    describe('mapToParams', () => {
        it('should format filters data to query params as is', () => {
            const filterData = { query: 'my query' };

            expect(service.mapToData(filterData)).toEqual(filterData);
        });
    });
});
