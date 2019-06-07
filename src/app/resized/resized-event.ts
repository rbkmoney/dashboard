import { ElementRef } from '@angular/core';

export interface ResizedEvent {
    readonly element: ElementRef;
    readonly width: number;
    readonly height: number;
    readonly oldWidth?: number;
    readonly oldHeight?: number;
}
