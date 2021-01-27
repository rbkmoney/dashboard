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

    const daterange = {
        begin: moment(),
        end: moment(),
    };
    const formattedDaterange = {
        begin: daterange.begin.format(),
        end: daterange.end.format(),
    };

    beforeEach(() => {
        mockDaterangeManagerService = mock(DaterangeManagerService);
        mockRouter = mock(Router);
        mockActivatedRoute = mock(ActivatedRoute);
    });

    beforeEach(() => {
        when(mockActivatedRoute.queryParams).thenReturn(of({}));
    });

    beforeEach(() => {
        when(mockDaterangeManagerService.serializeDateRange(deepEqual(daterange))).thenReturn(formattedDaterange);
        when(mockDaterangeManagerService.deserializeDateRange(deepEqual(formattedDaterange))).thenReturn(daterange);
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

        it('should parse binPan fully', () => {
            expect(
                service.mapToData({
                    first6: '123456',
                    last4: '1234',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: '123456',
                    pan: '1234',
                },
            });
        });

        it('should not create binPan object if there is no first6 and last4 exists', () => {
            expect(
                service.mapToData({
                    invoiceIDs: 'invoice-id',
                })
            ).toEqual({
                invoiceIDs: ['invoice-id'],
            });
        });

        it('should parse bin if first6 has 6 numeric symbols', () => {
            expect(
                service.mapToData({
                    first6: '123456',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: '123456',
                    pan: null,
                },
            });
        });

        it('should parse pan if last4 has 4 numeric symbols', () => {
            expect(
                service.mapToData({
                    last4: '1234',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: null,
                    pan: '1234',
                },
            });
        });

        it('should not parse bin if it has non-numeric symbols', () => {
            expect(
                service.mapToData({
                    first6: '12345a',
                    last4: '1234',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: null,
                    pan: '1234',
                },
            });
        });

        it('should not parse pan if it has non-numeric symbols', () => {
            expect(
                service.mapToData({
                    first6: '123456',
                    last4: '123a',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: '123456',
                    pan: null,
                },
            });
        });

        it('should not parse bin if it not 6 numeric symbols', () => {
            expect(
                service.mapToData({
                    first6: '12345',
                    last4: '1234',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: null,
                    pan: '1234',
                },
            });
            expect(
                service.mapToData({
                    first6: '1234567',
                    last4: '1234',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: null,
                    pan: '1234',
                },
            });
        });

        it('should not parse pan if it not 4 numeric symbols', () => {
            expect(
                service.mapToData({
                    first6: '123456',
                    last4: '12345',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: '123456',
                    pan: null,
                },
            });
            expect(
                service.mapToData({
                    first6: '123456',
                    last4: '123',
                })
            ).toEqual({
                binPan: {
                    paymentMethod: 'bankCard',
                    bin: '123456',
                    pan: null,
                },
            });
        });

        it('should return empty values as params', () => {
            expect(service.mapToData({})).toEqual({});
            expect(service.mapToData({ shopIDs: '' })).toEqual({});
            expect(service.mapToData({ invoiceIDs: '' })).toEqual({});
        });
    });

    describe('mapToParams', () => {
        it('should not set empty params', () => {
            expect(
                service.mapToParams({
                    daterange,
                    shopIDs: [],
                    invoiceIDs: ['my-invoice-id'],
                    additional: {
                        mine: {},
                        another: null,
                    },
                })
            ).toEqual({
                fromTime: formattedDaterange.begin,
                toTime: formattedDaterange.end,
                invoiceIDs: ['my-invoice-id'],
            });
        });

        it('should transform bin in first6', () => {
            expect(
                service.mapToParams({
                    daterange,
                    binPan: {
                        paymentMethod: 'bankCard',
                        bin: '123456',
                        pan: null,
                    },
                })
            ).toEqual({
                fromTime: formattedDaterange.begin,
                toTime: formattedDaterange.end,
                first6: '123456',
            });
        });

        it('should transform pan in last4', () => {
            expect(
                service.mapToParams({
                    daterange,
                    binPan: {
                        paymentMethod: 'bankCard',
                        bin: null,
                        pan: '1234',
                    },
                })
            ).toEqual({
                fromTime: formattedDaterange.begin,
                toTime: formattedDaterange.end,
                last4: '1234',
            });
        });

        it('should transform binPan data in first6 and last4', () => {
            expect(
                service.mapToParams({
                    daterange,
                    binPan: {
                        paymentMethod: 'bankCard',
                        bin: '123456',
                        pan: '1234',
                    },
                })
            ).toEqual({
                fromTime: formattedDaterange.begin,
                toTime: formattedDaterange.end,
                first6: '123456',
                last4: '1234',
            });
        });

        it('should remove binPan from params if bin and pan empty', () => {
            expect(
                service.mapToParams({
                    daterange,
                    binPan: {
                        paymentMethod: 'bankCard',
                        bin: null,
                        pan: null,
                    },
                })
            ).toEqual({
                fromTime: formattedDaterange.begin,
                toTime: formattedDaterange.end,
            });
        });
    });
});
