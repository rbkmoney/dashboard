import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ChangeDetectorRef,
    ViewContainerRef,
    AfterContentInit,
    OnDestroy,
    ElementRef,
    ContentChild,
    ViewChild,
    EventEmitter,
    Output,
} from '@angular/core';
import { matExpansionAnimations } from '@angular/material/expansion';
import { take, startWith, filter } from 'rxjs/operators';

import { ExpandDetailsContentDirective } from './directives';
import { ExpandAnimationState } from './types';

@Component({
    selector: 'dsh-expand-details',
    templateUrl: 'expand-details.component.html',
    styleUrls: ['expand-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [matExpansionAnimations.bodyExpansion, matExpansionAnimations.indicatorRotate],
})
export class ExpandDetailsComponent implements AfterContentInit, OnDestroy {
    @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    get expanded(): boolean {
        return this._expanded;
    }
    set expanded(expanded: boolean) {
        expanded = coerceBooleanProperty(expanded);
        if (this._expanded !== expanded) {
            this._expanded = expanded;
            if (expanded) {
                this.opened.emit();
            }

            this._changeDetectorRef.markForCheck();
        }
    }

    get expansionState(): ExpandAnimationState {
        return this.expanded ? ExpandAnimationState.Expanded : ExpandAnimationState.Collapsed;
    }

    @ContentChild(ExpandDetailsContentDirective) _lazyContent: ExpandDetailsContentDirective;

    @ViewChild('body') _body: ElementRef<HTMLElement>;

    portal: TemplatePortal;

    private _expanded = false;

    constructor(private _changeDetectorRef: ChangeDetectorRef, private _viewContainerRef: ViewContainerRef) {}

    ngAfterContentInit(): void {
        if (this._lazyContent) {
            this.opened
                .pipe(
                    startWith(null),
                    filter(() => this.expanded && !this.portal),
                    take(1)
                )
                .subscribe(() => {
                    this.portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
                });
        }
    }

    ngOnDestroy(): void {
        this.opened.complete();
    }

    toggle(): void {
        this.expanded = !this.expanded;
    }
}
