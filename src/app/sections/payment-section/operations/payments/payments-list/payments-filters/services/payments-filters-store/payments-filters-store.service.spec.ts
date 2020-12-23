import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { of } from 'rxjs';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';

import { PaymentsFiltersStoreService } from './payments-filters-store.service';

describe('PaymentsFiltersStoreService', () => {
    let service: PaymentsFiltersStoreService;
    let mockDaterangeManagerService: DaterangeManagerService;
    let mockRouter: Router;
    let mockActivatedRoute: ActivatedRoute;

    beforeEach(() => {
        mockDaterangeManagerService = mock(DaterangeManagerService);
        mockRouter = mock(Router);
        mockActivatedRoute = mock(ActivatedRoute);
    });

    beforeEach(() => {
        when(mockActivatedRoute.queryParams).thenReturn(of({}));
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                PaymentsFiltersStoreService,
                {
                    provide: DaterangeManagerService,
                    useFactory: () => instance(mockDaterangeManagerService),
                },
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
        service = TestBed.inject(PaymentsFiltersStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('mapToData', () => {
        it('should format daterange params', () => {
            const daterange = {
                begin: moment(),
                end: moment(),
            };
            when(
                mockDaterangeManagerService.deserializeDateRange(
                    deepEqual({
                        begin: daterange.begin.format(),
                        end: daterange.end.format(),
                    })
                )
            ).thenReturn(daterange);

            expect(
                service.mapToData({
                    fromTime: daterange.begin.format(),
                    toTime: daterange.end.format(),
                })
            ).toEqual({
                daterange,
            });
        });

        it('should format invoices and shops ids params', () => {
            expect(
                service.mapToData({
                    shopIDs: ['shop-id-1', 'shop-id-2'],
                    invoiceIDs: ['invoice-id-1', 'invoice-id-2'],
                })
            ).toEqual({
                shopIDs: ['shop-id-1', 'shop-id-2'],
                invoiceIDs: ['invoice-id-1', 'invoice-id-2'],
            });
        });

        it('should format invoices and shops single id params', () => {
            expect(
                service.mapToData({
                    shopIDs: 'shop-id',
                    invoiceIDs: 'invoice-id',
                })
            ).toEqual({
                shopIDs: ['shop-id'],
                invoiceIDs: ['invoice-id'],
            });
        });

        it('should return empty values as params', () => {
            expect(service.mapToData({})).toEqual({});
            expect(service.mapToData({ shopIDs: '' })).toEqual({});
            expect(service.mapToData({ invoiceIDs: '' })).toEqual({});
        });
    });

    // describe('mapToParams', () => {
    //     it('should not set empty params', () => {
    //
    //     });
    // });
});
