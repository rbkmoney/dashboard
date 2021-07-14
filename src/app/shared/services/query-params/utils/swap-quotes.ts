export function swapQuotes(str: string) {
    return str.replace(/['"]/g, (m) => (m === '"' ? "'" : '"'));
}
