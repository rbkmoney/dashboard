import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { instance, mock, when } from 'ts-mockito';

import { PayoutTool } from '@dsh/api-codegen/capi';
import { PayoutsService } from '@dsh/api/payouts';

import { ShopPayoutToolDetailsService } from './shop-payout-tool-details.service';

describe('ShopPayoutToolDetailsService', () => {
    let service: ShopPayoutToolDetailsService;
    let mockPayoutsService: PayoutsService;

    beforeEach(() => {
        mockPayoutsService = mock(PayoutsService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ShopPayoutToolDetailsService,
                {
                    provide: PayoutsService,
                    useFactory: () => instance(mockPayoutsService),
                },
            ],
        });
        service = TestBed.inject(ShopPayoutToolDetailsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getContract', () => {
        it('should tick contract value if contracts came with no errors', () => {
            // can't test it with cold/hot marbles cause it's an subject
            service.shopPayoutTool$.pipe(take(1)).subscribe((data: PayoutTool) => {
                expect(data).toEqual({
                    currency: 'USD',
                    details: {
                        detailsType: 'any',
                    },
                    id: 'my_id',
                });
            });

            when(mockPayoutsService.getPayoutToolByID('contract_id', 'payout_tool_id')).thenReturn(
                of({
                    currency: 'USD',
                    details: {
                        detailsType: 'any',
                    },
                    id: 'my_id',
                })
            );

            service.requestPayoutTool({
                contractID: 'contract_id',
                payoutToolID: 'payout_tool_id',
            });

            expect().nothing();
        });

        it('should tick errors value if contracts came with errors', () => {
            when(mockPayoutsService.getPayoutToolByID('contract_id', 'payout_tool_id')).thenReturn(
                of(null).pipe(
                    map(() => {
                        throw new Error(`[TEST_ERROR]: Error in observable`);
                    })
                )
            );

            service.requestPayoutTool({
                contractID: 'contract_id',
                payoutToolID: 'payout_tool_id',
            });

            expect(service.errorOccurred$).toBeObservable(
                cold('a', {
                    a: true,
                })
            );
        });
    });
});
