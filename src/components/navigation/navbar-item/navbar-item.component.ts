import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OnChanges, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ComponentChanges } from '@rbkmoney/utils';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
    selector: 'dsh-navbar-item',
    templateUrl: 'navbar-item.component.html',
    styleUrls: ['navbar-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarItemComponent implements OnChanges {
    @Input() icon: string;
    @Input() active = false;
    @Input() withToggle = false;
    @Input() toggleChecked = false;
    @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild(MatSlideToggle, { static: false }) slideToggle: MatSlideToggle;

    isLargeIcon$: Observable<boolean> = this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(pluck('matches'));

    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnChanges({ active }: ComponentChanges<NavbarItemComponent>): void {
        if (active?.currentValue !== active?.previousValue) {
            this.activeChange.next(active.currentValue);
        }
    }

    toggle(): void {
        if (!this.withToggle) {
            return;
        }
        this.slideToggle.toggle();
        this.toggleChange.emit(this.slideToggle.checked);
    }

    slideToggleChange({ checked }: MatSlideToggleChange): void {
        this.toggleChange.emit(checked);
    }
}
