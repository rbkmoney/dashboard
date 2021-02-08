export function removeDictFields<T>(dict: T, predicate: (value: unknown) => boolean): Partial<T> {
    return Object.entries(dict).reduce((acc: Partial<T>, [key, value]: [string, unknown]) => {
        if (predicate(value)) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
