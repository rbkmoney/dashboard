import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnalyticsService as APIAnalyticsService } from '../../../../../../api-codegen/anapi';
import { InlineResponse200 } from '../../../../../../api-codegen/anapi/swagger-codegen';
import { AnalyticsService } from '../../../../../../api/analytics';
import { ShopsBalanceService } from './shops-balance.service';

@Injectable()
class MockAnalyticsService extends AnalyticsService {
    set mockGroupBalances(value: InlineResponse200) {
        this._mockGroupBalances = value;
    }
    private _mockGroupBalances: InlineResponse200;

    getGroupBalances(): Observable<InlineResponse200> {
        return of(this._mockGroupBalances);
    }
}

describe('ShopsBalanceService', () => {
    let service: ShopsBalanceService;
    let analyticsService: MockAnalyticsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ShopsBalanceService,
                {
                    provide: AnalyticsService,
                    useClass: MockAnalyticsService,
                },
                {
                    provide: APIAnalyticsService,
                    useValue: null, // not used
                },
            ],
        });
        service = TestBed.inject(ShopsBalanceService);
        analyticsService = TestBed.inject(AnalyticsService) as MockAnalyticsService;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('balances$', () => {
        it('should return balances list from AnalyticsService', () => {
            const expected$ = cold('a', {
                a: [
                    {
                        id: 'first-shop',
                        data: {
                            amount: 20,
                            currency: 'USD',
                        },
                    },
                    {
                        id: 'second-shop',
                        data: {
                            amount: 4,
                            currency: 'USD',
                        },
                    },
                    {
                        id: 'third-shop',
                        data: {
                            amount: 2,
                            currency: 'USD',
                        },
                    },
                ],
            });

            analyticsService.mockGroupBalances = {
                result: [
                    {
                        groupBySHopResults: [
                            {
                                id: 'first-shop',
                                amountResults: [
                                    {
                                        amount: 20,
                                        currency: 'USD',
                                    },
                                ],
                            },
                            {
                                id: 'second-shop',
                                amountResults: [
                                    {
                                        amount: 4,
                                        currency: 'USD',
                                    },
                                ],
                            },
                            {
                                id: 'third-shop',
                                amountResults: [
                                    {
                                        amount: 2,
                                        currency: 'USD',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };

            expect(service.balances$).toBeObservable(expected$);
        });

        it('should return list with nullable data if api has no data for some shops', () => {
            const expected$ = cold('a', {
                a: [
                    {
                        id: 'first-shop',
                        data: null,
                    },
                    {
                        id: 'second-shop',
                        data: null,
                    },
                    {
                        id: 'third-shop',
                        data: {
                            amount: 2,
                            currency: 'USD',
                        },
                    },
                ],
            });

            analyticsService.mockGroupBalances = {
                result: [
                    {
                        groupBySHopResults: [
                            {
                                id: 'first-shop',
                                amountResults: [],
                            },
                            {
                                id: 'second-shop',
                            },
                            {
                                id: 'third-shop',
                                amountResults: [
                                    {
                                        amount: 2,
                                        currency: 'USD',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };

            expect(service.balances$).toBeObservable(expected$);
        });

        it('should return empty balances list if api has no data', () => {
            const expected$ = cold('a', {
                a: [],
            });

            analyticsService.mockGroupBalances = {
                result: [
                    {
                        groupBySHopResults: [],
                    },
                ],
            };

            expect(service.balances$).toBeObservable(expected$);
        });

        it('should return empty balances list if there was an error', () => {
            const expected$ = cold('a', {
                a: [],
            });

            analyticsService.getGroupBalances = () => {
                return of({
                    result: [],
                }).pipe(
                    map(() => {
                        throw new Error('[TEST ERROR] Mock Error');
                    })
                );
            };

            expect(service.balances$).toBeObservable(expected$);
        });
    });
    // setShopIds
});
