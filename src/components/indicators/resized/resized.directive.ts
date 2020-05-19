import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

import { ResizedEvent } from './resized-event';

/**
 * @description sometimes when used need wrapped div (or another HTML element)
 * because add "resize sensor" invisible element
 * (for example: affects flex layout gap - extra indentation will be added)
 */
@Directive({
    selector: '[dshResized], [dsh-resized]',
})
export class ResizedDirective implements OnInit, OnDestroy {
    @Output() readonly dshResized = new EventEmitter<ResizedEvent>();
    private currentEvent: ResizedEvent;
    private resizeSensor: ResizeSensor;

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {
        this.currentEvent = {
            element: this.elementRef,
            width: 0,
            height: 0,
        };
    }

    ngOnInit() {
        this.resizeSensor = new ResizeSensor(this.elementRef.nativeElement, () => this.resize());
    }

    ngOnDestroy() {
        this.resizeSensor.detach();
    }

    private resize() {
        const { width, height } = this.elementRef.nativeElement.getBoundingClientRect();
        if (width === this.currentEvent.width && height === this.currentEvent.height) {
            return;
        }
        const event: ResizedEvent = {
            element: this.elementRef,
            width,
            height,
            oldWidth: this.currentEvent.width,
            oldHeight: this.currentEvent.height,
        };
        this.currentEvent = event;
        this.dshResized.emit(event);
    }
}
