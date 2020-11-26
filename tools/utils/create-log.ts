export function createLog(prefix: string) {
    // tslint:disable-next-line:no-console
    return (message: string) => console.log(`[${prefix}]: ${message}`);
}
