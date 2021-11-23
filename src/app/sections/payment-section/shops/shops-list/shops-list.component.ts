import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';

import { ShopItem } from '../types/shop-item';
import { ShopsExpandedIdManagerService } from './services/shops-expanded-id-manager/shops-expanded-id-manager.service';

@Component({
    selector: 'dsh-shops-list',
    templateUrl: 'shops-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopsListComponent {
    @Input() shopList: ShopItem[];

    @Input() lastUpdated: string;
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;

    @Output() refresh = new EventEmitter<void>();
    @Output() showMore = new EventEmitter<void>();

    expandedId$: Observable<number> = this.expandedIdManager.expandedId$;

    constructor(private expandedIdManager: ShopsExpandedIdManagerService) {}

    get isListExist(): boolean {
        return !isNil(this.shopList);
    }

    get isEmptyList(): boolean {
        return this.isListExist && this.shopList.length === 0;
    }

    refreshList(): void {
        this.refresh.emit();
    }

    showMoreElements(): void {
        this.showMore.emit();
    }

    expandedIdChange(id: number): void {
        this.expandedIdManager.expandedIdChange(id);
    }
}
