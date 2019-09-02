import { ActivatedRoute } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

import { ClaimService } from './claim.service';
import { ClaimsService } from '../../api';

function assertDeepEqual(actual: any, expected: any) {
    expect(actual).toEqual(expected);
}

function createScheduler() {
    return new TestScheduler(assertDeepEqual);
}

describe('ClaimService', () => {
    function createClaimService(getClaim: () => ColdObservable<string>, params: ColdObservable<any>) {
        return new ClaimService(
            { getClaimByID: (..._: any[]): any => getClaim() } as ClaimsService,
            { params: params as any } as ActivatedRoute
        );
    }

    it('should load claim', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const service = createClaimService(() => cold('-x|'), cold('-a-|', { a: { id: '10' } }));
            expectObservable(service.claim$).toBe('--x|');
        });
    });

    it('should load 2 claims', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const service = createClaimService(() => cold('-x|'), cold('-a-b-|', { a: { id: '10' }, b: { id: '20' } }));
            expectObservable(service.claim$).toBe('--x-x|');
        });
    });

    it('empty and wrong id shouldnt load claim', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const service = createClaimService(() => cold('-x|'), cold('-a-b-|', { a: {}, b: { id: 'test' } }));
            expectObservable(service.claim$).toBe('-----|');
        });
    });

    it('duplicate id shouldnt load claim', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const service = createClaimService(() => cold('-x|'), cold('-a-b-|', { a: { id: '20' }, b: { id: '20' } }));
            expectObservable(service.claim$).toBe('--x--|');
        });
    });
});
