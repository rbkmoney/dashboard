import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
    AfterContentChecked,
    AfterContentInit,
    Attribute,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { CanDisable, HasTabIndex } from '@angular/material/core';
import { merge, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { coerceBoolean } from '../../../../utils';
import { DshInkBarDirective } from '../ink-bar.directive';
import { TabType } from '../tab-type';

const TAB_LINK_QUERY_SELECTOR = 'div';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[dsh-tab-nav-bar]',
    templateUrl: 'tab-nav-bar.html',
    styleUrls: ['tab-nav-bar.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TabNavComponent implements AfterContentChecked, AfterContentInit, OnDestroy {
    @Input() color: string;
    @Input() type: TabType;

    @HostBinding('class.dsh-tab-nav-bar') tabNavBar = true;
    @Input() @coerceBoolean @HostBinding('class.dsh-tab-nav-bar-inverted') inverted = false;

    private readonly _onDestroy = new Subject<void>();

    private _activeLinkChanged: boolean;
    private _activeLinkElement: ElementRef<HTMLElement> | null;

    @ViewChild(DshInkBarDirective, { static: true }) _inkBar: DshInkBarDirective;

    @ContentChildren(forwardRef(() => TabLinkComponent), { descendants: true })
    _tabLinks: QueryList<TabLinkComponent>;

    constructor(
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
            const activeTab = this._tabLinks.find((tab) => tab.active);

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
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement, {
                offset: {
                    right:
                        (this._activeLinkElement.nativeElement?.clientWidth || 0) -
                        (this._activeLinkElement.nativeElement?.querySelector(TAB_LINK_QUERY_SELECTOR)?.clientWidth ||
                            0),
                },
            });
        } else {
            this._inkBar.hide();
        }
    }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[dsh-tab-link], [dshTabLink]',
    templateUrl: 'tab-link.html',
    exportAs: 'dshTabLink',
})
export class TabLinkComponent implements CanDisable, HasTabIndex {
    private _isActive: boolean;

    @Input() disabled: boolean;
    @Input() tabIndex: number;
    @Input() badge?: string | number;

    defaultTabIndex: number;

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
    @HostBinding('attr.tabIndex') tabIndexClass;
    @HostBinding('class.dsh-tab-disabled') tabDisabledClass;
    @HostBinding('class.dsh-tab-label-active') tabLabelActiveClass = this.active;

    constructor(
        private _tabNavBar: TabNavComponent,
        public _elementRef: ElementRef,
        @Attribute('tabindex') tabIndex: string
    ) {
        this.tabIndex = parseInt(tabIndex, 10) || 0;
        this.tabIndexClass = this.tabIndex;
        this.tabDisabledClass = this.disabled;
    }
}
