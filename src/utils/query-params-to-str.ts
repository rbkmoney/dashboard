export function queryParamsToStr(params: { [N in PropertyKey]: any }): string {
    return Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');
}
