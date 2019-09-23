export interface ResultWithToken<T> {
    continuationToken?: string;
    result?: T[];
}
