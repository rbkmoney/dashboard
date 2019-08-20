import { TestScheduler } from 'rxjs/testing';

import { takeExecutionContext } from './take-execution-context';

function assertDeepEqual(actual, expected) {
    expect(actual).toEqual(expected);
}

function createScheduler() {
    return new TestScheduler(assertDeepEqual);
}

describe('takeExecutionContext', () => {
    it('operation without delay should not emit loading event', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '-a-b-c|';
            const flow = cold(operation).pipe(takeExecutionContext());
            expectObservable(flow).toBe('-0-1-2|', [
                { type: 'Receive', value: 'a' },
                { type: 'Receive', value: 'b' },
                { type: 'Receive', value: 'c' }
            ]);
        });
    });

    it('operation with delay < loading delay should not emit loading event', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '-a 10ms b-c|';
            const flow = cold(operation).pipe(takeExecutionContext());
            expectObservable(flow).toBe('-0 10ms 1-2|', [
                { type: 'Receive', value: 'a' },
                { type: 'Receive', value: 'b' },
                { type: 'Receive', value: 'c' }
            ]);
        });
    });

    it('emit value, delay > loading delay, emit value. Should emit: 2 receive, 1 loading event', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = 'a 100ms b---|';
            const loadingDelayMs = 50;
            const flow = cold(operation).pipe(takeExecutionContext(loadingDelayMs));
            expectObservable(flow).toBe('2 49ms 0 50ms (1 3)|', [
                { type: 'Loading', isLoading: true },
                { type: 'Loading', isLoading: false },
                { type: 'Receive', value: 'a' },
                { type: 'Receive', value: 'b' }
            ]);
        });
    });

    it('delay < loading delay, emit value, delay > loading delay, emit value. Should emit: receive, loading events', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '10ms a 100ms b---|';
            const loadingDelayMs = 50;
            const flow = cold(operation).pipe(takeExecutionContext(loadingDelayMs));
            expectObservable(flow).toBe('10ms 2 49ms 0 50ms (1 3)|', [
                { type: 'Loading', isLoading: true },
                { type: 'Loading', isLoading: false },
                { type: 'Receive', value: 'a' },
                { type: 'Receive', value: 'b' }
            ]);
        });
    });

    it('delay > loading delay, emit value, delay > loading delay, emit value. Should emit 2 receive 2 loading events', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '100ms a 100ms b---|';
            const loadingDelayMs = 50;
            const flow = cold(operation).pipe(takeExecutionContext(loadingDelayMs));
            expectObservable(flow).toBe('50ms 0 49ms (1 2) 46ms 0 50ms (1 3)|', [
                { type: 'Loading', isLoading: true },
                { type: 'Loading', isLoading: false },
                { type: 'Receive', value: 'a' },
                { type: 'Receive', value: 'b' }
            ]);
        });
    });

    it('delay > loading delay, emit value, error. Should emit: loading, receive, error events', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '100ms a---#';
            const loadingDelayMs = 50;
            const flow = cold(operation).pipe(takeExecutionContext(loadingDelayMs));
            expectObservable(flow).toBe('50ms 0 49ms (1 2) (3 #)', [
                { type: 'Loading', isLoading: true },
                { type: 'Loading', isLoading: false },
                { type: 'Receive', value: 'a' },
                { type: 'Error', error: 'error' }
            ]);
        });
    });
});
