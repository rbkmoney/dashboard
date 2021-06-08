export function createUnionTypeGuardCreator<T, P extends keyof T = keyof T>(typeProperty: P) {
    return <Y extends T>(type: T[P]) =>
        (obj: T): obj is Y =>
            obj[typeProperty] === type;
}
