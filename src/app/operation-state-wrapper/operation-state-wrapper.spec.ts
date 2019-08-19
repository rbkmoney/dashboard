import { TestScheduler } from 'rxjs/testing';

import { OperationStateWrapper } from './operation-state-wrapper';

function assertDeepEqual(actual, expected) {
    expect(actual).toEqual(expected);
}

function createScheduler() {
    return new TestScheduler(assertDeepEqual);
}

describe('OperationStateWrapper', () => {
    it('should transparently wrap operation', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;
            const operation = '-a-b-c|';
            const wrapper = new OperationStateWrapper();
            expectObservable(wrapper.wrap(cold(operation))).toBe(operation);
        });
    });

    it('operation with delay greeter than loading delay should emit loading state', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;

            const operation = '- 900ms a|';
            const loadingDelayMs = 50;

            const wrapper = new OperationStateWrapper(loadingDelayMs);
            expectObservable(wrapper.wrap(cold(operation))).toBe(operation);
            expectObservable(wrapper.isLoading()).toBe('0 49ms 1 850ms 0', [false, true]);
        });
    });

    it('operation with delay less than loading delay should not emit loading state', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;

            const operation = '- 20ms a|';
            const loadingDelayMs = 100;

            const wrapper = new OperationStateWrapper(loadingDelayMs);
            expectObservable(wrapper.wrap(cold(operation))).toBe(operation);
            expectObservable(wrapper.isLoading()).toBe('0', [false]);
        });
    });

    it('error should emit error state', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;

            const operation = '- 900ms a #|';
            const loadingDelayMs = 50;

            const wrapper = new OperationStateWrapper(loadingDelayMs);
            expectObservable(wrapper.wrap(cold(operation))).toBe('- 900ms a #');
            expectObservable(wrapper.isError()).toBe('0 901ms 1', [false, true]);
        });
    });

    it('successful completion of an operation should emit operation end state', () => {
        createScheduler().run(helpers => {
            const { cold, expectObservable } = helpers;

            const operation = '- 900ms a|';
            const loadingDelayMs = 50;

            const wrapper = new OperationStateWrapper(loadingDelayMs);
            expectObservable(wrapper.wrap(cold(operation))).toBe(operation);
            expectObservable(wrapper.isOperationEnd()).toBe('0 900ms 1', [false, true]);
        });
    });
});
