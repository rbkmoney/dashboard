export function fakeDate(date: string): Date {
    return { toISOString: () => date } as any;
}
