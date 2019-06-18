import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CanColorCtor, CanDisableRippleCtor, mixinColor, mixinDisableRipple } from '@angular/material';

import { DshTabHeaderComponent } from './tab-header.component';
import { DshTabComponent } from './tab.component';

let nextId = 0;

export type DshTabHeaderPosition = 'above' | 'below';

class DshTabGroupBase {
    constructor(public _elementRef: ElementRef) {}
}

const _MatTabGroupMixinBase: CanColorCtor & CanDisableRippleCtor & typeof DshTabGroupBase = mixinColor(
    mixinDisableRipple(DshTabGroupBase),
    'primary'
);

export class DshTabChangeEvent {
    index: number;
    tab: DshTabComponent;
}

@Component({
    selector: 'dsh-tab-group',
    exportAs: 'dshTabGroup',
    templateUrl: 'tab-group.component.html',
    styleUrls: ['tab-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DshTabGroupComponent extends _MatTabGroupMixinBase implements AfterContentChecked {
    @ContentChildren(DshTabComponent) _tabs: QueryList<DshTabComponent>;

    @ViewChild('tabBodyWrapper') _tabBodyWrapper: ElementRef;

    @ViewChild('tabHeader') _tabHeader: DshTabHeaderComponent;

    private _indexToSelect: number | null = 0;

    @Input()
    get selectedIndex(): number | null {
        return this._selectedIndex;
    }

    set selectedIndex(value: number | null) {
        this._indexToSelect = value;
    }

    private _selectedIndex: number | null = null;

    @Input() headerPosition: DshTabHeaderPosition = 'above';

    private animationDuration = '500ms';

    @Output() readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() readonly selectedTabChange: EventEmitter<DshTabChangeEvent> = new EventEmitter<DshTabChangeEvent>(true);

    private readonly _groupId: number;

    constructor(elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {
        super(elementRef);
        this._groupId = nextId++;
    }

    ngAfterContentChecked() {
        const indexToSelect = (this._indexToSelect = this._clampTabIndex(this._indexToSelect));

        if (this._selectedIndex !== indexToSelect) {
            const isFirstRun = this._selectedIndex == null;

            if (!isFirstRun) {
                this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
            }

            Promise.resolve().then(() => {
                this._tabs.forEach((tab, index) => (tab.isActive = index === indexToSelect));

                if (!isFirstRun) {
                    this.selectedIndexChange.emit(indexToSelect);
                }
            });
        }

        this._tabs.forEach((tab: DshTabComponent, index: number) => {
            tab.position = index - indexToSelect;

            if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - this._selectedIndex;
            }
        });

        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this._changeDetectorRef.markForCheck();
        }
    }

    private _createChangeEvent(index: number): DshTabChangeEvent {
        const event = new DshTabChangeEvent();
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    }

    private _handleClick(tab: DshTabComponent, index: number) {
        if (!tab.disabled) {
            this.selectedIndex = index;
        }
    }

    private _clampTabIndex = (index: number | null) => Math.min(this._tabs.length - 1, Math.max(index || 0, 0));

    private _getTabLabelId = (i: number) => `dsh-tab-label-${this._groupId}-${i}`;

    private _getTabContentId = (i: number) => `dsh-tab-content-${this._groupId}-${i}`;

    private _getTabIndex = (i: number) => (this.selectedIndex === i ? 0 : -1);

    private _isActive = (i: number) => this.selectedIndex === i;
}
