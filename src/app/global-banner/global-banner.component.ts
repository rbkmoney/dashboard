import {
    AfterContentChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';

import { Mascots } from './mascots';

@Component({
    selector: 'dsh-global-banner',
    templateUrl: 'global-banner.component.html',
    styleUrls: ['global-banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalBannerComponent implements OnChanges, AfterViewInit, AfterContentChecked {
    @Input()
    mascot: Mascots;

    @Input()
    title: string;

    @Input()
    isActive: boolean;

    @Output()
    closed = new EventEmitter<void>();

    constructor(private elRef: ElementRef) {
    }

    close() {
        this.closed.emit();
    }

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit', this.isActive);
        if (this.isActive) {
            document.body.style.paddingBottom = this.elRef.nativeElement.getBoundingClientRect().height + 32 + 'px';
        } else {
            document.body.style.paddingBottom = 0 + 'px';
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { isActive } = changes;
        console.log('ngOnChanges', this.isActive, isActive.currentValue);
        if (isActive.currentValue) {
            console.log(this.elRef.nativeElement.offsetHeight)
            document.body.style.paddingBottom = this.elRef.nativeElement.getBoundingClientRect().height + 32 + 'px';
        } else {
            document.body.style.paddingBottom = 0 + 'px';
        }
    }

    ngAfterContentChecked(): void {
        console.log('ngAfterContentChecked', this.isActive);
        if (this.isActive) {
            document.body.style.paddingBottom = this.elRef.nativeElement.getBoundingClientRect().height + 32 + 'px';
        } else {
            document.body.style.paddingBottom = 0 + 'px';
        }
    }
}
