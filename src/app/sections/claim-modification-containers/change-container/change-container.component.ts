import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import get from 'lodash.get';

import {
    DocumentModificationUnit,
    ContractorModificationUnit,
    ContractModificationUnit,
    ShopModificationUnit
} from '../../../api-codegen/claim-management';
import { ChangeContainerType } from './change-container-type';

@Component({
    selector: 'dsh-change-container',
    templateUrl: 'change-container.component.html',
    styleUrls: ['change-container.component.scss']
})
export class ChangeContainerComponent implements OnChanges {
    @Input() unit:
        | ContractorModificationUnit
        | ContractModificationUnit
        | ShopModificationUnit
        | DocumentModificationUnit;

    opened = false;

    changeContainerType: ChangeContainerType;

    ngOnChanges({ unit }: SimpleChanges): void {
        if (get(unit.currentValue, ['claimModificationType']) === 'DocumentModificationUnit') {
            this.changeContainerType = ChangeContainerType.documentModification;
        }
    }
}
