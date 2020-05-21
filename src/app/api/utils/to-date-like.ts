export function toDateLike(date: string) {
    return {
        toISOString: () => date,
        toString: () => date,
    } as Date;
}
