import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { instance, mock, when } from 'ts-mockito';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';

import { ShopsSelectionManagerService } from './shops-selection-manager.service';

describe('ShopsSelectionManagerService', () => {
    let service: ShopsSelectionManagerService;
    let mockApiShopsService: ApiShopsService;

    function createService() {
        TestBed.configureTestingModule({
            providers: [
                ShopsSelectionManagerService,
                {
                    provide: ApiShopsService,
                    useFactory: () => instance(mockApiShopsService),
                },
            ],
        });
        service = TestBed.inject(ShopsSelectionManagerService);
    }

    beforeEach(() => {
        mockApiShopsService = mock(ApiShopsService);
    });

    beforeEach(() => {
        const testList = new Array(12)
            .fill({
                id: '',
                createdAt: new Date(),
                isBlocked: false,
                isSuspended: false,
                categoryID: 0,
                location: {
                    locationType: 'type',
                },
                details: {
                    name: 'my name',
                    description: 'some description',
                },
                contractID: 'contractID',
                payoutToolID: 'payoutToolID',
                scheduleID: 1,
                account: {
                    currency: 'USD',
                    guaranteeID: 2,
                    settlementID: 2,
                },
            })
            .map((el: Shop, i: number) => {
                const isOdd = i % 2 === 0;
                return {
                    ...el,
                    id: isOdd ? `test_id_${i}` : `live_id_${i}`,
                    categoryID: isOdd ? 1 : 2,
                };
            });
        when(mockApiShopsService.shops$).thenReturn(of(testList));
    });

    describe('creation', () => {
        beforeEach(() => {
            createService();
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('setRealm', () => {
        beforeEach(() => {
            createService();
        });

        it('should tick shops after realm was inited', () => {
            const beforeInit$ = hot('^', {});

            expect(service.shops$.pipe(map((shops: Shop[]) => shops.map(({ id }) => id)))).toBeObservable(beforeInit$);

            const afterInit$ = hot('a', {
                a: ['test_id_0', 'test_id_2', 'test_id_4', 'test_id_6', 'test_id_8', 'test_id_10'],
            });

            service.setRealm(PaymentInstitutionRealm.Test);

            expect(service.shops$.pipe(map((shops: Shop[]) => shops.map(({ id }) => id)))).toBeObservable(afterInit$);
        });

        it('should filter shops by realm even if they changed', () => {
            const testRealm$ = hot('a', {
                a: ['test_id_0', 'test_id_2', 'test_id_4', 'test_id_6', 'test_id_8', 'test_id_10'],
            });

            service.setRealm(PaymentInstitutionRealm.Test);

            expect(service.shops$.pipe(map((shops: Shop[]) => shops.map(({ id }) => id)))).toBeObservable(testRealm$);

            const liveRealm$ = hot('a', {
                a: ['live_id_1', 'live_id_3', 'live_id_5', 'live_id_7', 'live_id_9', 'live_id_11'],
            });

            service.setRealm(PaymentInstitutionRealm.Live);

            expect(service.shops$.pipe(map((shops: Shop[]) => shops.map(({ id }) => id)))).toBeObservable(liveRealm$);
        });
    });

    describe('setSelectedIds', () => {
        beforeEach(() => {
            createService();
        });

        it('should change selected list using selected ids', () => {
            const liveRealm$ = hot('a', {
                a: ['live_id_3', 'live_id_5'],
            });

            service.setRealm(PaymentInstitutionRealm.Live);
            service.setSelectedIds(['live_id_3', 'live_id_5']);

            expect(service.selectedShops$.pipe(map((shops: Shop[]) => shops.map(({ id }) => id)))).toBeObservable(
                liveRealm$
            );
        });
    });
});
