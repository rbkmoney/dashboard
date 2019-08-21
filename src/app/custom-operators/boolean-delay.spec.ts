import { TestScheduler } from 'rxjs/testing';

import { booleanDelay } from './boolean-delay';

function assertDeepEqual(actual, expected) {
    expect(actual).toEqual(expected);
}

function createScheduler() {
    return new TestScheduler(assertDeepEqual);
}

describe('booleanDelay', () => {
    it('operation without delays', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '-a-b-c|';
            const flow = cold(operation).pipe(booleanDelay());
            expectObservable(flow).toBe('-0-0-0|', [false]);
        });
    });

    it('operation with single delay', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '100ms a|';
            const flow = cold(operation).pipe(booleanDelay(50));
            expectObservable(flow).toBe('50ms 1 49ms 0|', [false, true]);
        });
    });

    it('operation with multiple delays', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = 'a 100ms b 100ms c|';
            const flow = cold(operation).pipe(booleanDelay(50));
            expectObservable(flow).toBe('0 49ms 1 50ms 0 49ms 1 50ms 0|', [false, true]);
        });
    });

    it('operation with delay less than operator delay', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = 'a 20ms b 100ms c|';
            const flow = cold(operation).pipe(booleanDelay(50));
            expectObservable(flow).toBe('0 20ms 0 49ms 1 50ms 0|', [false, true]);
        });
    });

    it('operation with error', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '100ms #';
            const flow = cold(operation).pipe(booleanDelay(50));
            expectObservable(flow).toBe('50ms 1 49ms (0 #)', [false, true]);
        });
    });
});
