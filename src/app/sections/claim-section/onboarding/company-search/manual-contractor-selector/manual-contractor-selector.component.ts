import { Component, EventEmitter, Output } from '@angular/core';

import { Contractor, LegalEntity, IndividualEntity } from '@dsh/api-codegen/questionary';

import LegalEntityTypeEnum = LegalEntity.LegalEntityTypeEnum;
import IndividualEntityTypeEnum = IndividualEntity.IndividualEntityTypeEnum;
import ContractorTypeEnum = Contractor.ContractorTypeEnum;

export type EntityType = 'Russian' | 'International';

@Component({
    selector: 'dsh-manual-contractor-selector',
    templateUrl: 'manual-contractor-selector.component.html',
})
export class ManualContractorSelectorComponent {
    @Output() contractorTypeSelected = new EventEmitter<{
        contractorType: ContractorTypeEnum;
        entityType: LegalEntityTypeEnum | IndividualEntityTypeEnum;
    }>();

    contractorType: ContractorTypeEnum;

    entityTypeChange(entityType: EntityType): void {
        this.contractorTypeSelected.emit({
            contractorType: this.contractorType,
            entityType: this.getEntityType(entityType),
        });
    }

    private getEntityType(entityType: EntityType): LegalEntityTypeEnum | IndividualEntityTypeEnum {
        if (this.contractorType === ContractorTypeEnum.LegalEntityContractor) {
            return entityType === 'Russian'
                ? LegalEntityTypeEnum.RussianLegalEntity
                : LegalEntityTypeEnum.InternationalLegalEntity;
        }
        if (this.contractorType === ContractorTypeEnum.IndividualEntityContractor) {
            return entityType === 'Russian'
                ? IndividualEntityTypeEnum.RussianIndividualEntity
                : IndividualEntityTypeEnum.RussianIndividualEntity;
        }
    }
}
