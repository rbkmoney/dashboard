import { SuggestionType } from './type';
import { PartySuggest } from './party';
import { AddressSuggest } from './address';

export interface Suggestion<T> {
    value: string;
    unrestricted_value: string;
    data: T;
}

export interface Suggestions<D> {
    suggestions: Suggestion<D>[];
}

export interface Suggest<P, D> {
    params: P;
    result: Suggestions<D>;
}

export type RequestSuggestions = { [name in SuggestionType]: Suggest<{}, {}> } & {
    [SuggestionType.party]: PartySuggest;
    [SuggestionType.address]: AddressSuggest;
};

export type SuggestionParams<T extends SuggestionType> = RequestSuggestions[T]['params'];
export type SuggestionResult<T extends SuggestionType> = RequestSuggestions[T]['result'];
export type SuggestionData<T extends SuggestionType> = SuggestionResult<T>['suggestions'][0];
