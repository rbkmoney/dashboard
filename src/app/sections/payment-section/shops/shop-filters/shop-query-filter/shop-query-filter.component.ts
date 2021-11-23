import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-shop-query-filter',
    templateUrl: './shop-query-filter.component.html',
})
export class ShopQueryFilterComponent {
    @Input() query: string;
    @Output() filterChanged = new EventEmitter<string>();

    onFilterChanged(value: string): void {
        this.filterChanged.emit(value);
    }
}
