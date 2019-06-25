import { Directive, ElementRef, HostBinding, Inject, InjectionToken, NgZone } from '@angular/core';

export type _DshInkBarPositioner = (element: HTMLElement) => { left: string; width: string };

export const _DSH_INK_BAR_POSITIONER = new InjectionToken<_DshInkBarPositioner>('DshInkBarPositioner', {
    providedIn: 'root',
    factory: _DSH_INK_BAR_POSITIONER_FACTORY
});

export function _DSH_INK_BAR_POSITIONER_FACTORY(): _DshInkBarPositioner {
    const method = (element: HTMLElement) => ({
        left: element ? (element.offsetLeft || 0) + 'px' : '0',
        width: element ? (element.offsetWidth || 0) + 'px' : '0'
    });

    return method;
}

@Directive({
    selector: 'dsh-ink-bar'
})
export class DshInkBarDirective {
    @HostBinding('class.dsh-ink-bar')
    classInkBar = true;

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _ngZone: NgZone,
        @Inject(_DSH_INK_BAR_POSITIONER) private _inkBarPositioner: any
    ) {}

    alignToElement(element: HTMLElement) {
        this.show();

        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => this._setStyles(element));
            });
        } else {
            this._setStyles(element);
        }
    }

    show = () => (this._elementRef.nativeElement.style.visibility = 'visible');

    hide = () => (this._elementRef.nativeElement.style.visibility = 'hidden');

    private _setStyles(element: HTMLElement) {
        const positions = this._inkBarPositioner(element);
        const inkBar: HTMLElement = this._elementRef.nativeElement;

        inkBar.style.left = positions.left;
        inkBar.style.width = positions.width;
    }
}
