import isNil from 'lodash.isnil';

export function getTextContent(nativeElement: HTMLElement): string | null {
    return isNil(nativeElement.textContent) ? null : nativeElement.textContent.trim();
}
