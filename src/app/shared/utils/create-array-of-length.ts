export function createArrayOfLength(length: number, fillValue: any = null): (any | null)[] {
    return new Array(length).fill(fillValue);
}
