export interface Suggestion<T> {
    value: string;
    unrestricted_value: string;
    data: T;
}

export interface Suggestions {
    suggestions: Suggestion<PartySuggestionData>[];
}

// tslint:disable-next-line:no-empty-interface
export interface AddressSuggestionData {}

export interface PartySuggestionData {
    address: Suggestion<AddressSuggestionData>;
}
