export function getBaseClass<T>() {
    return class BaseClass {} as new () => { [N in keyof T]: T[N] };
}
