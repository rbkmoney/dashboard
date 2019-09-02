import { TestScheduler } from 'rxjs/testing';

import { takeError } from './take-error';

function assertDeepEqual(actual, expected) {
    expect(actual).toEqual(expected);
}

function createScheduler() {
    return new TestScheduler(assertDeepEqual);
}

describe('takeError', () => {
    it('operation without error', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '-a-b-c|';
            const flow = cold(operation).pipe(takeError());
            expectObservable(flow).toBe('------|');
        });
    });

    it('operation with error', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '-a-#-c|';
            const flow = cold(operation).pipe(takeError());
            expectObservable(flow).toBe('---(0|)', ['error']);
        });
    });
});
