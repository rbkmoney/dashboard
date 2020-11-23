export function createLog(prefix: string) {
    return (message: string) => console.log(`[${prefix}]: ${message}`);
}
