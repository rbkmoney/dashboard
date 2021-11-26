import { TestBed } from '@angular/core/testing';
// import { cold, getTestScheduler } from 'jasmine-marbles';
// import { of, scheduled } from 'rxjs';
// import { map } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

// import { generateMockBalance } from '../../tests/generate-mock-balance';
// import { generateMockShopId } from '../../tests/generate-mock-shop-id';
import { MockAnalyticsService } from '../../tests/mock-analytics-service';
import { ShopsBalanceService } from './shops-balance.service';

describe('ShopsBalanceService', () => {
    let service: ShopsBalanceService;
    let analyticsService: MockAnalyticsService;

    beforeEach(() => {
        analyticsService = new MockAnalyticsService();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ShopsBalanceService,
                {
                    provide: AnalyticsService,
                    useValue: analyticsService,
                },
            ],
        });
        service = TestBed.inject(ShopsBalanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // describe('getBalances', () => {
    //     it('should return balances list from AnalyticsService', () => {
    //         const expected$ = cold('(a|)', {
    //             a: [generateMockBalance(1, 20), generateMockBalance(2, 4), generateMockBalance(3, 2)],
    //         });
    //
    //         analyticsService.setMockBalancesResponse({
    //             result: [
    //                 {
    //                     groupBySHopResults: [
    //                         {
    //                             id: generateMockShopId(1),
    //                             amountResults: [
    //                                 {
    //                                     amount: 20,
    //                                     currency: 'USD',
    //                                 },
    //                             ],
    //                         },
    //                         {
    //                             id: generateMockShopId(2),
    //                             amountResults: [
    //                                 {
    //                                     amount: 4,
    //                                     currency: 'USD',
    //                                 },
    //                             ],
    //                         },
    //                         {
    //                             id: generateMockShopId(3),
    //                             amountResults: [
    //                                 {
    //                                     amount: 2,
    //                                     currency: 'USD',
    //                                 },
    //                             ],
    //                         },
    //                     ],
    //                 },
    //             ],
    //         });
    //
    //         expect(
    //             service.getBalances([generateMockShopId(1), generateMockShopId(2), generateMockShopId(3)])
    //         ).toBeObservable(expected$);
    //     });
    //
    //     it('should return list with nullable data if api has no data for some shops', () => {
    //         const expected$ = cold('(a|)', {
    //             a: [generateMockBalance(1), generateMockBalance(2), generateMockBalance(3, 2)],
    //         });
    //
    //         analyticsService.setMockBalancesResponse({
    //             result: [
    //                 {
    //                     groupBySHopResults: [
    //                         {
    //                             id: generateMockShopId(1),
    //                             amountResults: [],
    //                         },
    //                         {
    //                             id: generateMockShopId(2),
    //                         },
    //                         {
    //                             id: generateMockShopId(3),
    //                             amountResults: [
    //                                 {
    //                                     amount: 2,
    //                                     currency: 'USD',
    //                                 },
    //                             ],
    //                         },
    //                     ],
    //                 },
    //             ],
    //         });
    //
    //         expect(
    //             service.getBalances([generateMockShopId(1), generateMockShopId(2), generateMockShopId(3)])
    //         ).toBeObservable(expected$);
    //     });
    //
    //     it('should return empty balances list if api has no data', () => {
    //         const expected$ = cold('(a|)', {
    //             a: [],
    //         });
    //
    //         analyticsService.setMockBalancesResponse({
    //             result: [
    //                 {
    //                     groupBySHopResults: [],
    //                 },
    //             ],
    //         });
    //
    //         expect(
    //             service.getBalances([generateMockShopId(1), generateMockShopId(2), generateMockShopId(3)])
    //         ).toBeObservable(expected$);
    //     });
    //
    //     it('should return empty balances list if there was an error', () => {
    //         const expected$ = cold('(a|)', {
    //             a: [],
    //         });
    //
    //         analyticsService.getGroupBalances = () => {
    //             return scheduled(
    //                 of({
    //                     result: [],
    //                 }),
    //                 getTestScheduler()
    //             ).pipe(
    //                 map(() => {
    //                     throw new Error('[TEST ERROR] Mock Error');
    //                 })
    //             );
    //         };
    //
    //         expect(
    //             service.getBalances([generateMockShopId(1), generateMockShopId(2), generateMockShopId(3)])
    //         ).toBeObservable(expected$);
    //     });
    // });
});
