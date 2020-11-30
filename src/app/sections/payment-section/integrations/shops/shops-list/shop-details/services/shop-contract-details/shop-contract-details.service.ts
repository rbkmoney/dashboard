import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { Contract } from '../../../../../../../../api-codegen/capi';
import { ContractsService } from '../../../../../../../../api/contracts';

@Injectable()
export class ShopContractDetailsService {
    shopContract$: Observable<Contract>;
    errorOccurred$: Observable<boolean>;

    private getContract$: Subject<string> = new Subject();
    private error$: Subject<any> = new BehaviorSubject(false);
    private contract$: Subject<Contract> = new Subject();

    constructor(private contractsService: ContractsService) {
        this.shopContract$ = this.contract$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();

        this.getContract$
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
                filter((result) => result !== 'error')
            )
            .subscribe((contract) => this.contract$.next(contract as Contract));
    }

    getContract(contractID: string): void {
        this.getContract$.next(contractID);
    }
}
