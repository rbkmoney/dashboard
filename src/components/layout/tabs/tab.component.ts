import { TemplatePortal } from '@angular/cdk/portal';
import {
    Component,
    ContentChild,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { CanDisable } from '@angular/material/core';
import { Subject } from 'rxjs';

import { coerceBoolean } from '../../../utils';
import { DshTabContentDirective } from './tab-content.directive';
import { DshTabLabelDirective } from './tab-label.directive';

@Component({
    selector: 'dsh-tab',
    templateUrl: 'tab.component.html',
    exportAs: 'dshTab',
})
export class DshTabComponent implements OnInit, CanDisable, OnChanges, OnDestroy {
    @ContentChild(DshTabLabelDirective) templateLabel: DshTabLabelDirective;

    @ContentChild(DshTabContentDirective, { read: TemplateRef })
    _explicitContent: TemplateRef<any>;

    @ViewChild(TemplateRef, { static: true }) _implicitContent: TemplateRef<any>;

    @Input()
    @coerceBoolean
    disabled: boolean;

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('label') textLabel = '';

    @Input('aria-label') ariaLabel: string;

    @Input('aria-labelledby') ariaLabelledby: string;

    private _contentPortal: TemplatePortal | null = null;

    get content(): TemplatePortal | null {
        return this._contentPortal;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    readonly _stateChanges = new Subject<void>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    position: number | null = null;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    origin: number | null = null;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isActive = false;

    constructor(private _viewContainerRef: ViewContainerRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        // eslint-disable-next-line no-prototype-builtins
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this._stateChanges.next();
        }
    }

    ngOnDestroy(): void {
        this._stateChanges.complete();
    }

    ngOnInit(): void {
        this._contentPortal = new TemplatePortal(
            this._explicitContent || this._implicitContent,
            this._viewContainerRef
        );
    }
}
