import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';

import { Mascots } from './mascots';

@Component({
    selector: 'dsh-global-banner',
    templateUrl: 'global-banner.component.html',
    styleUrls: ['global-banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalBannerComponent implements AfterViewInit, OnDestroy {
    @Input()
    mascot: Mascots;

    @Input()
    title: string;

    @Input()
    isActive: boolean;

    @Output()
    closed = new EventEmitter<void>();

    constructor(private elRef: ElementRef) {}

    close() {
        this.closed.emit();
    }

    ngAfterViewInit(): void {
        document.body.style.paddingBottom = this.elRef.nativeElement.getBoundingClientRect().height + 32 + 16 + 'px';
    }

    ngOnDestroy(): void {
        document.body.style.paddingBottom = '0px';
    }
}
