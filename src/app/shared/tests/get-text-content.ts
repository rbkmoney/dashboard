import { isNil } from '@dsh/utils';

export function getTextContent(nativeElement: HTMLElement): string | null {
    return isNil(nativeElement.textContent) ? null : nativeElement.textContent.trim();
}
