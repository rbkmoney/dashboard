import {
    AfterContentChecked,
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { Subject } from 'rxjs';

import { DshTabLabelWrapperDirective } from './tab-label-wrapper.directive';
import { DshInkBarDirective } from './ink-bar.directive';

@Component({
    selector: 'dsh-tab-header',
    exportAs: 'dshTabHeader',
    templateUrl: 'tab-header.component.html',
    styleUrls: ['tab-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DshTabHeaderComponent implements AfterContentChecked, AfterContentInit, OnDestroy {
    @ContentChildren(DshTabLabelWrapperDirective) _labelWrappers: QueryList<DshTabLabelWrapperDirective>;
    @ViewChild(DshInkBarDirective) _inkBar: DshInkBarDirective;
    @ViewChild('tabListContainer') _tabListContainer: ElementRef;
    @ViewChild('tabList') _tabList: ElementRef;

    private _selectedIndexChanged = false;

    private readonly _destroyed = new Subject<void>();

    private _stopScrolling = new Subject<void>();

    @Input()
    get selectedIndex(): number {
        return this._selectedIndex;
    }

    set selectedIndex(value: number) {
        this._selectedIndexChanged = this._selectedIndex !== value;
        this._selectedIndex = value;
    }

    private _selectedIndex = 0;

    constructor(
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _viewportRuler: ViewportRuler,
        @Optional() private _dir: Directionality
    ) {}

    ngAfterContentChecked() {
        if (this._selectedIndexChanged) {
            this._alignInkBarToSelectedTab();
            this._selectedIndexChanged = false;
        }
    }

    ngAfterContentInit() {
        this._alignInkBarToSelectedTab();
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._stopScrolling.complete();
    }

    _alignInkBarToSelectedTab() {
        const selectedLabelWrapper =
            this._labelWrappers && this._labelWrappers.length
                ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
                : null;

        this._inkBar.alignToElement(selectedLabelWrapper);
    }
}
