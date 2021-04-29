import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { Contract } from '@dsh/api-codegen/capi';
import { ContractsService } from '@dsh/api/contracts';

@UntilDestroy()
@Injectable()
export class ShopContractDetailsService {
    shopContract$: Observable<Contract>;
    errorOccurred$: Observable<boolean>;

    private contractRequest$: Subject<string> = new Subject();
    // TODO: contract errors not forwarded
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
                    contractID
                        ? this.contractsService.getContractByID(contractID).pipe(
                              catchError((e) => {
                                  console.error(e);
                                  this.error$.next(true);
                                  return of('error');
                              })
                          )
                        : of(null)
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
