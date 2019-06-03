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

    @ViewChild(TemplateRef) _implicitContent: TemplateRef<any>;

    @Input() textLabel = '';

    @Input() ariaLabel: string;

    @Input() ariaLabelledby: string;

    private _contentPortal: TemplatePortal | null = null;

    get content(): TemplatePortal | null {
        return this._contentPortal;
    }

    readonly _stateChanges = new Subject<void>();

    position: number | null = null;

    origin: number | null = null;

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
