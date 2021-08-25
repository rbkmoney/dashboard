import { Component, OnInit, Injector } from '@angular/core';
import { FormControl, FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { Shop, Contract, RussianLegalEntity } from '@dsh/api-codegen/capi';
import { ContractsService } from '@dsh/api/contracts';
import { KonturFocusService } from '@dsh/api/kontur-focus';
import {
    RequiredSuper,
    ValidatedWrappedAbstractControlSuperclass,
    createValidatedAbstractControlProviders,
    progressTo,
    errorTo,
} from '@dsh/utils';

import { PartyContent } from '../../../../../../api-codegen/aggr-proxy';
import { createContractorByDadataData, createContractorByKonturFocusData } from '../../../../../utils';
import { RussianBankAccountForm } from '../russian-bank-account-form/types/bank-account-form-data';

enum Type {
    New,
    Existing,
}

export interface OrgDetailsForm {
    type: Type;
    contract: Overwrite<Contract, { contractor: RussianLegalEntity }>;

    registeredName: string;
    inn: string;
    registeredNumber: string;
    actualAddress: string;
    representativePosition: string;
    representativeFullName: string;
    representativeDocument: string;

    bankAccount: RussianBankAccountForm;
}

@UntilDestroy()
@Component({
    selector: 'dsh-shop-contract',
    templateUrl: 'org-details-form.component.html',
    providers: createValidatedAbstractControlProviders(OrgDetailsFormComponent),
})
export class OrgDetailsFormComponent
    extends ValidatedWrappedAbstractControlSuperclass<OrgDetailsForm>
    implements OnInit
{
    formControl = this.fb.group<OrgDetailsForm>({
        type: null,
        contract: null,

        registeredName: null,
        inn: null,
        registeredNumber: null,
        actualAddress: null,
        representativePosition: null,
        representativeFullName: null,
        representativeDocument: null,

        bankAccount: null,
    });
    type = Type;
    progress$ = new BehaviorSubject(0);
    error$ = new BehaviorSubject<unknown>(null);
    shopControl = new FormControl<Shop>(null);
    searchControl = new FormControl<string>('');

    constructor(
        injector: Injector,
        private contractsService: ContractsService,
        private fb: FormBuilder,
        private konturFocusService: KonturFocusService
    ) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        this.shopControl.valueChanges
            .pipe(
                switchMap((shop) =>
                    shop
                        ? this.contractsService.getContractByID(shop.contractID).pipe(
                              progressTo(this.progress$),
                              errorTo(this.error$),
                              catchError(() => EMPTY)
                          )
                        : of(null)
                ),
                untilDestroyed(this)
            )
            .subscribe((contract) => this.formControl.controls.contract.setValue(contract));
        return super.ngOnInit();
    }

    updateSuggestion(content: PartyContent): void {
        this.konturFocusService
            .request('ReqQuery', {
                inn: [content.inn],
            })
            .pipe(
                map(([data]) => createContractorByKonturFocusData(data)),
                catchError((e) => {
                    console.error('Kontur.Focus API error', e);
                    return of(createContractorByDadataData(content));
                }),
                untilDestroyed(this)
            )
            .subscribe(() => {
                // if (isRussianLegalEntityContractor(contractor))
                //     this.formControl.patchValue({ name: contractor.legalEntity.name });
            });
    }
}
