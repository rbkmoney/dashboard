import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, defer, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { Contract } from '@dsh/api-codegen/capi';
import { RussianLegalEntity } from '@dsh/api-codegen/claim-management';
import { ContractsService } from '@dsh/api/contracts';

@UntilDestroy()
@Injectable()
export class ShopContractDetailsService {
    shopContract$: Observable<Overwrite<Contract, { contractor: RussianLegalEntity }>> = defer(() =>
        this.contract$.asObservable()
    );
    errorOccurred$: Observable<boolean> = defer(() => this.error$.asObservable());
    isLoading$: Observable<boolean> = defer(() => this._isLoading$.asObservable());

    private contractRequest$: Subject<string> = new Subject();
    // TODO: contract errors not forwarded
    private error$ = new BehaviorSubject<boolean>(false);
    private contract$ = new ReplaySubject<Overwrite<Contract, { contractor: RussianLegalEntity }>>();
    private _isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(private contractsService: ContractsService) {
        this.contractRequest$
            .pipe(
                tap(() => this.error$.next(false)),
                distinctUntilChanged(),
                tap(() => this._isLoading$.next(true)),
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
                tap(() => this._isLoading$.next(false)),
                filter((result) => result !== 'error'),
                untilDestroyed(this)
            )
            .subscribe((contract) => this.contract$.next(contract));
    }

    requestContract(contractID: string): void {
        this.contractRequest$.next(contractID);
    }
}
