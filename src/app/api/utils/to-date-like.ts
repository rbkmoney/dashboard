export function toDateLike(date: string) {
    return { toISOString: () => date } as Date;
}
