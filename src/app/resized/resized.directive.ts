import { Directive, ElementRef, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

import { ResizedEvent } from './resized-event';

@Directive({
    selector: '[dshResized]'
})
export class ResizedDirective implements OnInit, OnDestroy {
    @Output()
    readonly dshResized = new EventEmitter<ResizedEvent>();

    private oldWidth: number;

    private oldHeight: number;

    private resizeSensor: ResizeSensor;

    constructor(private readonly element: ElementRef) {}

    ngOnInit() {
        this.resizeSensor = new ResizeSensor(this.element.nativeElement, () => this.resize());
    }

    ngOnDestroy() {
        this.resizeSensor.detach();
    }

    private resize() {
        const width = this.element.nativeElement.clientWidth;
        const height = this.element.nativeElement.clientHeight;
        if (width === this.oldWidth && height === this.oldHeight) {
            return;
        }
        const event = new ResizedEvent(this.element, width, height, this.oldWidth, this.oldHeight);
        this.oldWidth = width;
        this.oldHeight = height;
        this.dshResized.emit(event);
    }
}
