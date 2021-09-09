import { Component, Injector, Input } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, of, Observable, throwError } from 'rxjs';
import { switchMap, catchError, share, tap } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { Shop, Contract, InternationalLegalEntity, LegalEntity, RussianLegalEntity } from '@dsh/api-codegen/capi';
import { ContractsService } from '@dsh/api/contracts';
import { CommonError } from '@dsh/app/shared';
import {
    ValidatedWrappedAbstractControlSuperclass,
    createValidatedAbstractControlProviders,
    progressTo,
    errorTo,
} from '@dsh/utils';

import EntityTypeEnum = LegalEntity.EntityTypeEnum;

export type ExistingContractForm<T extends EntityTypeEnum = EntityTypeEnum> = Overwrite<
    Contract,
    { contractor: T extends 'InternationalLegalEntity' ? InternationalLegalEntity : RussianLegalEntity }
>;

@UntilDestroy()
@Component({
    selector: 'dsh-existing-contract-form',
    templateUrl: 'existing-contract-form.component.html',
    providers: createValidatedAbstractControlProviders(ExistingContractFormComponent),
})
export class ExistingContractFormComponent extends ValidatedWrappedAbstractControlSuperclass<
    ExistingContractForm,
    Shop
> {
    @Input() entityType: EntityTypeEnum;

    formControl = this.fb.control<Shop>(null);
    contractProgress$ = new BehaviorSubject(0);
    error$ = new BehaviorSubject<unknown>(null);
    contract: Contract = null;

    constructor(
        injector: Injector,
        private contractsService: ContractsService,
        private fb: FormBuilder,
        private transloco: TranslocoService
    ) {
        super(injector);
    }

    protected outerToInner(): Shop {
        return null;
    }

    protected setUpInnerToOuter$(value$: Observable<Shop>): Observable<ExistingContractForm> {
        return value$.pipe(
            switchMap((shop) =>
                (shop
                    ? (this.contractsService.getContractByID(shop.contractID) as Observable<ExistingContractForm>).pipe(
                          switchMap((contract) => {
                              if (contract.contractor.entityType !== this.entityType)
                                  return this.transloco
                                      .selectTranslate(
                                          `existingContractForm.errors.${
                                              this.entityType === EntityTypeEnum.InternationalLegalEntity
                                                  ? 'onlyInternationalShopCanBeSelected'
                                                  : 'onlyRussianShopCanBeSelected'
                                          }`,
                                          null,
                                          'create-shop'
                                      )
                                      .pipe(switchMap((t) => throwError(new CommonError(t))));
                              return of(contract);
                          })
                      )
                    : of<ExistingContractForm>(null)
                ).pipe(
                    progressTo(this.contractProgress$),
                    errorTo(this.error$),
                    catchError(() => EMPTY)
                )
            ),
            tap((contract) => (this.contract = contract)),
            share()
        );
    }
}
