import { Directive, ElementRef, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

import { ResizedEvent } from './resized-event';

@Directive({
    selector: '[dshResized]'
})
export class ResizedDirective implements OnInit, OnDestroy {
    @Output() readonly dshResized = new EventEmitter<ResizedEvent>();
    private currentEvent: ResizedEvent;
    private resizeSensor: ResizeSensor;

    constructor(private readonly element: ElementRef) {
        this.currentEvent = {
            element: this.element,
            width: 0,
            height: 0
        };
    }

    ngOnInit() {
        this.resizeSensor = new ResizeSensor(this.element.nativeElement, () => this.resize());
    }

    ngOnDestroy() {
        this.resizeSensor.detach();
    }

    private resize() {
        const width = this.element.nativeElement.clientWidth;
        const height = this.element.nativeElement.clientHeight;
        if (width === this.currentEvent.width && height === this.currentEvent.height) {
            return;
        }
        const event = {
            element: this.element,
            width,
            height,
            oldWidth: this.currentEvent.width,
            oldHeight: this.currentEvent.height
        };
        this.currentEvent = event;
        this.dshResized.emit(event);
    }
}
