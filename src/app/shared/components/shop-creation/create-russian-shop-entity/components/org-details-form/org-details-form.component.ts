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

import { PartyContent, ReqResponse } from '../../../../../../api-codegen/aggr-proxy';
import { isIndividualOrg } from '../../../../../utils/to-questionary-data/dadata-data-to-questionary-data/create-individual-entity-contractor';
import {
    createIndividualEntityRegisteredName as createIndividualEntityRegisteredName,
    isReqIndividualEntity,
} from '../../../../../utils/to-questionary-data/kontur-focus-data-to-questionary-data/create-individual-entity-contractor';
import { isReqLegalEntity } from '../../../../../utils/to-questionary-data/kontur-focus-data-to-questionary-data/create-legal-entity-contractor';
import { getAddress } from '../../../../../utils/to-questionary-data/kontur-focus-data-to-questionary-data/get-address';
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
    contractProgress$ = new BehaviorSubject(0);
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
                              progressTo(this.contractProgress$),
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

    updateSuggestion(dadata: PartyContent): void {
        if (!dadata) this.formControl.patchValue(this.getFormByData());
        this.konturFocusService
            .request('ReqQuery', {
                inn: [dadata.inn],
            })
            .pipe(
                map(([kontur]): Partial<OrgDetailsForm> => this.getFormByData(dadata, kontur)),
                untilDestroyed(this)
            )
            .subscribe(
                (data) => this.formControl.patchValue(data),
                (err) => {
                    console.error('Kontur.Focus API error', err);
                    this.formControl.patchValue(this.getFormByData(dadata));
                }
            );
    }

    private getFormByData(dadata?: PartyContent, kontur?: ReqResponse): Partial<OrgDetailsForm> {
        const result: Partial<OrgDetailsForm> = {
            inn: kontur?.inn || dadata?.inn || null,
            registeredNumber: kontur?.ogrn || dadata?.ogrn || null,
            registeredName: dadata?.name?.shortWithOpf || null,
            actualAddress: null,
            representativeFullName: null,
        };
        if (dadata) {
            if (isIndividualOrg(dadata)) {
                result.actualAddress = dadata.address?.value || result.actualAddress;
                result.representativeFullName = dadata.name?.fullName || result.representativeFullName;
            }
        }
        if (kontur) {
            if (isReqIndividualEntity(kontur?.contractor)) {
                result.registeredName =
                    createIndividualEntityRegisteredName(kontur.contractor.fio) || result.registeredName;
                result.representativeFullName = kontur.contractor.fio || result.representativeFullName;
            }
            if (isReqLegalEntity(kontur?.contractor)) {
                result.registeredName = kontur.contractor.legalName.shortName || result.registeredName;
                result.actualAddress = getAddress(kontur.contractor.legalAddress.addressRf) || result.actualAddress;
            }
        }
        return result;
    }
}
