import isEqual from 'lodash/isEqual';
import { combineLatest, merge, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { ActionBtnContent, ContentConfig, TestEnvBtnContent } from '../content-config';

const apply = <T>(
    state: Observable<ContentConfig>,
    val: Observable<T>,
    fn: (args: [ContentConfig, T]) => ContentConfig
): Observable<ContentConfig> => combineLatest([state, val]).pipe(map(fn));

const applyActionBtnContent = (
    state: Observable<ContentConfig>,
    val: Observable<ActionBtnContent>
): Observable<ContentConfig> =>
    apply(state, val, ([s, actionBtnContent]) => ({
        ...s,
        actionBtnContent,
    }));

const applySubheading = (state: Observable<ContentConfig>, val: Observable<string>): Observable<ContentConfig> =>
    apply(state, val, ([s, subheading]) => ({
        ...s,
        subheading,
    }));

const applyTestEnvBtnContent = (
    state: Observable<ContentConfig>,
    val: Observable<TestEnvBtnContent>
): Observable<ContentConfig> =>
    apply(state, val, ([s, testEnvBtnContent]) => ({
        ...s,
        testEnvBtnContent,
    }));

export const applyToSate = (
    state: Observable<ContentConfig>,
    actionBtnContent: Observable<ActionBtnContent>,
    subheading: Observable<string>,
    testEnvBtnContent: Observable<TestEnvBtnContent>
): Observable<ContentConfig> => {
    const s = state.pipe(distinctUntilChanged(isEqual));
    return merge(
        applyActionBtnContent(s, actionBtnContent),
        applySubheading(s, subheading),
        applyTestEnvBtnContent(s, testEnvBtnContent)
    );
};
