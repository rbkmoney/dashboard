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
