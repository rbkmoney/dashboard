import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { ContractsService } from '@dsh/api/contracts';

import { Contract } from '@dsh/api-codegen/capi';

@UntilDestroy()
@Injectable()
export class ShopContractDetailsService {
    shopContract$: Observable<Contract>;
    errorOccurred$: Observable<boolean>;

    private contractRequest$: Subject<string> = new Subject();
    private error$: Subject<any> = new BehaviorSubject(false);
    private contract$: Subject<Contract> = new Subject();

    constructor(private contractsService: ContractsService) {
        this.shopContract$ = this.contract$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();

        this.contractRequest$
            .pipe(
                tap(() => this.error$.next(false)),
                distinctUntilChanged(),
                switchMap((contractID) =>
                    this.contractsService.getContractByID(contractID).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.error$.next(true);
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error'),
                untilDestroyed(this)
            )
            .subscribe((contract) => this.contract$.next(contract as Contract));
    }

    requestContract(contractID: string): void {
        this.contractRequest$.next(contractID);
    }
}
