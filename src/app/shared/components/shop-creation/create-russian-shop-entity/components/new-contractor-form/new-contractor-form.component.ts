import { Component, Injector } from '@angular/core';
import { FormControl, FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

import { KonturFocusService } from '@dsh/api/kontur-focus';
import { ValidatedWrappedAbstractControlSuperclass, createValidatedAbstractControlProviders } from '@dsh/utils';

import { PartyContent, ReqResponse } from '../../../../../../api-codegen/aggr-proxy';
import { isIndividualOrg } from '../../../../../utils/to-questionary-data/dadata-data-to-questionary-data/create-individual-entity-contractor';
import {
    createIndividualEntityRegisteredName as createIndividualEntityRegisteredName,
    isReqIndividualEntity,
} from '../../../../../utils/to-questionary-data/kontur-focus-data-to-questionary-data/create-individual-entity-contractor';
import { isReqLegalEntity } from '../../../../../utils/to-questionary-data/kontur-focus-data-to-questionary-data/create-legal-entity-contractor';
import { getAddress } from '../../../../../utils/to-questionary-data/kontur-focus-data-to-questionary-data/get-address';
import { RussianBankAccountForm } from '../russian-bank-account-form/types/bank-account-form-data';

export interface NewContractorForm {
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
    selector: 'dsh-new-contractor-form',
    templateUrl: 'new-contractor-form.component.html',
    providers: createValidatedAbstractControlProviders(NewContractorFormComponent),
})
export class NewContractorFormComponent extends ValidatedWrappedAbstractControlSuperclass<NewContractorForm> {
    formControl = this.fb.group<NewContractorForm>({
        registeredName: null,
        inn: null,
        registeredNumber: null,
        actualAddress: null,
        representativePosition: null,
        representativeFullName: null,
        representativeDocument: null,
        bankAccount: null,
    });
    searchControl = new FormControl<string>('');

    constructor(injector: Injector, private fb: FormBuilder, private konturFocusService: KonturFocusService) {
        super(injector);
    }

    updateSuggestion(dadata: PartyContent): void {
        if (!dadata) return this.formControl.patchValue(this.getFormByData());
        this.konturFocusService
            .request('ReqQuery', {
                inn: [dadata.inn],
            })
            .pipe(
                map(([kontur]): Partial<NewContractorForm> => this.getFormByData(dadata, kontur)),
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

    private getFormByData(dadata?: PartyContent, kontur?: ReqResponse): Partial<NewContractorForm> {
        const result: Partial<NewContractorForm> = {
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
