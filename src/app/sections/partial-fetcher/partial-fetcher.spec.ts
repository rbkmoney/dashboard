import { TestScheduler } from 'rxjs/testing';
import { Observable } from 'rxjs';

import { PartialFetcher } from './partial-fetcher';
import { FetchResult } from './fetch-result';

function assertDeepEqual(actual: any, expected: any) {
    expect(actual).toEqual(expected);
}

function createScheduler() {
    return new TestScheduler(assertDeepEqual);
}

describe('PartialFetch', () => {
    class PartialFetched extends PartialFetcher<any, any> {
        constructor(private fetchFn: (params?: any, continuationToken?: string) => Observable<any>, debounce?: number) {
            super(debounce);
        }

        protected fetch(params: any, continuationToken: string) {
            return this.fetchFn(params, continuationToken);
        }
    }

    it('should init', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const result: FetchResult<any> = { result: ['test'] };
            const partialFetched = new PartialFetched(() => cold('--x|', { x: result }), 100);
            expectObservable(partialFetched.searchResult$).toBe('');
        });
    });

    it('should search with debounce', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const result: FetchResult<any> = { result: ['test'] };
            const partialFetched = new PartialFetched(() => cold('--x|', { x: result }), 100);
            partialFetched.search(null);
            expectObservable(partialFetched.searchResult$).toBe('100ms --0', [['test']]);
        });
    });

    it('should load more with last token', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const partialFetched = new PartialFetched(
                (_params, token) =>
                    cold('--x|', { x: { result: [token], continuationToken: 'token' } } as FetchResult<any>),
                0
            );
            partialFetched.search(null);
            partialFetched.fetchMore();
            expectObservable(partialFetched.searchResult$).toBe('--0-1', [[undefined], [undefined, 'token']]);
        });
    });

    it('should reload with old params', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const partialFetched = new PartialFetched(
                params => cold('--x|', { x: { result: [params], continuationToken: 'token' } as FetchResult<any> }),
                0
            );
            partialFetched.search('params');
            partialFetched.fetchMore();
            partialFetched.refresh();
            expectObservable(partialFetched.searchResult$).toBe('--0-1-2', [
                ['params'],
                ['params', 'params'],
                ['params']
            ]);
        });
    });
});
