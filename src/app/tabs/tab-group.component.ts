import { Component, ContentChildren, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { DshTabComponent } from './tab.component';

let nextId = 0;

@Component({
    selector: 'dsh-tab-group',
    exportAs: 'dshTabGroup',
    templateUrl: 'tab-group.component.html',
    styleUrls: ['tab-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DshTabGroupComponent {

    @ContentChildren(DshTabComponent) tabs: QueryList<DshTabComponent>;

    @Input()
    get selectedIndex(): number | null { return this._selectedIndex; }
    set selectedIndex(value: number | null) {
        this._selectedIndex = coerceNumberProperty(value, null);
    }
    private _selectedIndex: number | null = 0;

    private groupId: number;

    constructor() {
        this.groupId = nextId++;
        console.log(this.tabs);
    }

    private _getTabLabelId(i: number): string {
        return `dsh-tab-label-${this.groupId}-${i}`;
    }

    private _getTabContentId(i: number): string {
        return `dsh-tab-content-${this.groupId}-${i}`;
    }

    private _getTabIndex(tab: DshTabComponent, idx: number): number | null {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === idx ? 0 : -1;
    }
}

