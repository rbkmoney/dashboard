import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { ListCachingService } from '@dsh/app/shared/services/list-caching/list-caching.service';

import { getPaymentId } from "../../utils/get-payment-id";


@UntilDestroy()
@Injectable()
export class PaymentsCachingService extends ListCachingService<PaymentSearchResult> {
    constructor() {
        super();
    }

    updateCacheList(list: PaymentSearchResult[]): void {
        // to not mutate cached data we should make a shallow copy
        const itemsList = this.cachedItems.slice();

        list.forEach((item: PaymentSearchResult) => {
            const id = getPaymentId(item);

            if (!this.itemsMap.has(id)) {
                return;
            }

            const { listIndex } = this.itemsMap.get(id);
            itemsList.splice(listIndex, 1, item);
        });

        this.itemsList$.next(itemsList);
        this.updateCacheMap();
    }

    updateCacheMap(): void {
        this.cachedItems.forEach((item: PaymentSearchResult, listIndex: number) => {
            this.itemsMap.set(getPaymentId(item), {
                item,
                listIndex,
            });
        });
    }

    filterCachedElements(list: PaymentSearchResult[]): PaymentSearchResult[] {
        return list.filter((item: PaymentSearchResult) => {
            const id = getPaymentId(item);
            return !this.itemsMap.has(id);
        });
    }
}
