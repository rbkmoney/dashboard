import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, takeUntil } from 'rxjs/operators';

import { ShopService } from '../../../api';

@Pipe({
    name: 'shopDetails',
    pure: false,
})
export class ShopDetailsPipe implements PipeTransform, OnDestroy {
    private shopName$: BehaviorSubject<string> = new BehaviorSubject('');
    private shopIDChange$: Subject<string> = new Subject();
    private destroy$: Subject<void> = new Subject();

    constructor(private shopService: ShopService, private ref: ChangeDetectorRef) {
        combineLatest([this.shopService.shops$, this.shopIDChange$.pipe(distinctUntilChanged())])
            .pipe(
                takeUntil(this.destroy$),
                map(([shops, shopID]) => shops.find((s) => s.id === shopID)),
                pluck('details', 'name')
            )
            .subscribe((v) => {
                this.shopName$.next(v);
                this.ref.markForCheck();
            });
    }

    transform(shopID: string): string {
        this.shopIDChange$.next(shopID);
        return this.shopName$.value;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
