import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, of, Observable } from 'rxjs';
import { switchMap, catchError, share, tap } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { Shop, Contract, RussianLegalEntity } from '@dsh/api-codegen/capi';
import { ContractsService } from '@dsh/api/contracts';
import {
    ValidatedWrappedAbstractControlSuperclass,
    createValidatedAbstractControlProviders,
    progressTo,
    errorTo,
} from '@dsh/utils';

export type ContractForm = Overwrite<Contract, { contractor: RussianLegalEntity }>;

@UntilDestroy()
@Component({
    selector: 'dsh-existing-contract-form',
    templateUrl: 'existing-contract-form.component.html',
    providers: createValidatedAbstractControlProviders(ExistingContractFormComponent),
})
export class ExistingContractFormComponent extends ValidatedWrappedAbstractControlSuperclass<ContractForm, Shop> {
    formControl = this.fb.control<Shop>(null);
    contractProgress$ = new BehaviorSubject(0);
    error$ = new BehaviorSubject<unknown>(null);
    contract: Contract = null;

    constructor(injector: Injector, private contractsService: ContractsService, private fb: FormBuilder) {
        super(injector);
    }

    protected outerToInner(): Shop {
        return null;
    }

    protected setUpInnerToOuter$(value$: Observable<Shop>): Observable<ContractForm> {
        return value$.pipe(
            switchMap((shop) =>
                shop
                    ? (this.contractsService.getContractByID(shop.contractID) as Observable<ContractForm>).pipe(
                          progressTo(this.contractProgress$),
                          errorTo(this.error$),
                          catchError(() => EMPTY)
                      )
                    : of<ContractForm>(null)
            ),
            tap((contract) => (this.contract = contract)),
            share()
        );
    }
}
