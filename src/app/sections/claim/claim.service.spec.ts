import { ActivatedRoute } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

import { ClaimService } from './claim.service';
import { ClaimsService } from '../../claims';

function assertDeepEqual(actual: any, expected: any) {
    expect(actual).toEqual(expected);
}

describe('ClaimService', () => {
    function createClaimService(claim: ColdObservable<string>, params: ColdObservable<any>) {
        return new ClaimService(
            { getClaimByID: (..._: any[]): any => claim } as ClaimsService,
            { params: params as any } as ActivatedRoute
        );
    }

    it('should load claim', () => {
        new TestScheduler(assertDeepEqual).run(helpers => {
            const { cold, expectObservable } = helpers;
            const service = createClaimService(cold('-x|'), cold('-a-|', { a: { id: '10' } }));
            expectObservable(service.claim$).toBe('--x|');
        });
    });

    it('should load 2 claims', () => {
        new TestScheduler(assertDeepEqual).run(helpers => {
            const { cold, expectObservable, flush } = helpers;
            const service = createClaimService(cold('-x|'), cold('-a-b-|', { a: { id: '10' }, b: { id: '20' } }));
            expectObservable(service.claim$).toBe('--x-x|');
        });
    });

    it('empty and wrong id shouldnt load claim', () => {
        new TestScheduler(assertDeepEqual).run(helpers => {
            const { cold, expectObservable } = helpers;
            const service = createClaimService(cold('-x|'), cold('-a-b-|', { a: {}, b: { id: 'test' } }));
            expectObservable(service.claim$).toBe('-----|');
        });
    });

    it('duplicate id shouldnt load claim', () => {
        new TestScheduler(assertDeepEqual).run(helpers => {
            const { cold, expectObservable } = helpers;
            const service = createClaimService(
                cold('-x|'),
                cold('-a-b-|', { a: { id: '20' }, b: { id: { id: '20' } } })
            );
            expectObservable(service.claim$).toBe('--x--|');
        });
    });
});
