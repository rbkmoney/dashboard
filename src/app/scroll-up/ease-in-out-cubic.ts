/**
 * @param t [0,1]
 */
export function easeInOutCubic(t: number): number {
    if (t < 0.5) {
        return 4 * t ** 3;
    } else {
        return (t - 1) * (2 * t - 2) ** 2 + 1;
    }
}
