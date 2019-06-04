import { Component, ContentChild, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { CanDisable, CanDisableCtor, mixinDisabled } from '@angular/material';

import { DshTabLabelDirective } from './tab-label.directive';
import { DshTabContentDirective } from './tab-content.directive';

class DshTabBase {}
const _MatTabMixinBase: CanDisableCtor & typeof DshTabBase =
    mixinDisabled(DshTabBase);

@Component({
    selector: 'dsh-tab',
    templateUrl: 'tab.component.html',
    exportAs: 'dshTab'
})
export class DshTabComponent extends _MatTabMixinBase implements OnInit, CanDisable, OnChanges, OnDestroy {
    @ContentChild(DshTabLabelDirective) templateLabel: DshTabLabelDirective;

    @ContentChild(DshTabContentDirective, {read: TemplateRef})
    _explicitContent: TemplateRef<any>;

    /** Template inside the MatTab view that contains an `<ng-content>`. */
    @ViewChild(TemplateRef) _implicitContent: TemplateRef<any>;

    /** Plain text label for the tab, used when there is no template label. */
    @Input('label') textLabel: string = '';

    /** Aria label for the tab. */
    @Input('aria-label') ariaLabel: string;

    /**
     * Reference to the element that the tab is labelled by.
     * Will be cleared if `aria-label` is set at the same time.
     */
    @Input('aria-labelledby') ariaLabelledby: string;

    /** Portal that will be the hosted content of the tab */
    private _contentPortal: TemplatePortal | null = null;

    /** @docs-private */
    get content(): TemplatePortal | null {
        return this._contentPortal;
    }

    /** Emits whenever the internal state of the tab changes. */
    readonly _stateChanges = new Subject<void>();

    /**
     * The relatively indexed position where 0 represents the center, negative is left, and positive
     * represents the right.
     */
    position: number | null = null;

    /**
     * The initial relatively index origin of the tab if it was created and selected after there
     * was already a selected tab. Provides context of what position the tab should originate from.
     */
    origin: number | null = null;

    /**
     * Whether the tab is currently active.
     */
    isActive = false;

    constructor(private _viewContainerRef: ViewContainerRef) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this._stateChanges.next();
        }
    }

    ngOnDestroy(): void {
        this._stateChanges.complete();
    }

    ngOnInit(): void {
        this._contentPortal = new TemplatePortal(
            this._explicitContent || this._implicitContent, this._viewContainerRef);
    }
}
