import { ActivatedRoute } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';

import { ClaimService } from './claim.service';
import { ClaimsService } from '../../claims';

const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

describe('Timeline', () => {
    describe('ClaimService', () => {
        it('should load claim', () => {
            testScheduler.run(helpers => {
                const { cold, expectObservable } = helpers;
                const service = new ClaimService(
                    { getClaimByID: (..._: any[]): any => cold('-x|') } as ClaimsService,
                    { params: cold('-a-b-c-|', { a: { id: 10 }, b: {}, c: { id: 'test' } }) as any } as ActivatedRoute
                );
                expectObservable(service.claim$).toBe('--x----|');
            });
        });
    });
});
