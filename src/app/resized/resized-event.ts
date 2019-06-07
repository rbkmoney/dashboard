import { ElementRef } from '@angular/core';

export class ResizedEvent {
    constructor(
        readonly element: ElementRef,
        readonly width: number,
        readonly height: number,
        readonly oldWidth: number,
        readonly oldHeight: number
    ) {}
}
