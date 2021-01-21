export interface FetchResult<T> {
    results?: T[];
    continuationToken?: string;
    error?: any;
}
