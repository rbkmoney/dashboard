import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
    AfterContentChecked,
    AfterContentInit,
    Attribute,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CanDisable, HasTabIndex } from '@angular/material/core';
import { merge, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DshInkBarDirective } from '../ink-bar.directive';

@Component({
    selector: '[dsh-tab-nav-bar]',
    templateUrl: 'tab-nav-bar.html',
    styleUrls: ['tab-nav-bar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabNavComponent implements AfterContentChecked, AfterContentInit, OnDestroy {
    @Input() color: string;
    @HostBinding('class.dsh-tab-nav-bar') tabNavBar = true;

    private readonly _onDestroy = new Subject<void>();

    private _activeLinkChanged: boolean;
    private _activeLinkElement: ElementRef<HTMLElement> | null;

    @ViewChild(DshInkBarDirective, { static: true }) _inkBar: DshInkBarDirective;

    @ContentChildren(forwardRef(() => TabLinkDirective), { descendants: true })
    _tabLinks: QueryList<TabLinkDirective>;

    constructor(
        elementRef: ElementRef,
        @Optional() private _dir: Directionality,
        private _ngZone: NgZone,
        private _changeDetectorRef: ChangeDetectorRef,
        private _viewportRuler: ViewportRuler
    ) {}

    ngAfterContentInit(): void {
        this._ngZone.runOutsideAngular(() => {
            const dirChange = this._dir ? this._dir.change : observableOf(null);

            return merge(dirChange, this._viewportRuler.change(10))
                .pipe(takeUntil(this._onDestroy))
                .subscribe(() => this._alignInkBar());
        });
    }

    updateActiveLink(element: ElementRef) {
        this._activeLinkChanged = !!element;
        this._changeDetectorRef.markForCheck();
    }

    ngAfterContentChecked(): void {
        if (this._activeLinkChanged) {
            const activeTab = this._tabLinks.find(tab => tab.active);

            this._activeLinkElement = activeTab ? activeTab._elementRef : null;
            this._alignInkBar();
            this._activeLinkChanged = false;
        }
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    _alignInkBar(): void {
        if (this._activeLinkElement) {
            this._inkBar.show();
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
        } else {
            this._inkBar.hide();
        }
    }
}

@Directive({
    selector: '[dsh-tab-link], [dshTabLink]',
    exportAs: 'dshTabLink'
})
export class TabLinkDirective implements CanDisable, HasTabIndex {
    private _isActive: boolean;

    @Input() disabled: boolean;
    @Input() tabIndex: number;

    @Input()
    get active(): boolean {
        return this._isActive;
    }

    set active(value: boolean) {
        if (value !== this._isActive) {
            this._isActive = value;
            this.tabLabelActiveClass = value;
            this._tabNavBar.updateActiveLink(this._elementRef);
        }
    }

    @HostBinding('class.dsh-tab-link') tabLinkClass = true;
    @HostBinding('class.dsh-tab-label') tabLabel = true;
    @HostBinding('attr.tabIndex') tabIndexClass = this.tabIndex;
    @HostBinding('class.dsh-tab-disabled') tabDisabledClass = this.disabled;
    @HostBinding('class.dsh-tab-label-active') tabLabelActiveClass = this.active;

    constructor(
        private _tabNavBar: TabNavComponent,
        public _elementRef: ElementRef,
        ngZone: NgZone,
        platform: Platform,
        @Attribute('tabindex') tabIndex: string
    ) {
        this.tabIndex = parseInt(tabIndex) || 0;
    }
}
