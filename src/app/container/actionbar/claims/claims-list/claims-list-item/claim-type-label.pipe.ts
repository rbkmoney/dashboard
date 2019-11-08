import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { ClaimType } from './get-claim-type';

@Pipe({
    name: 'claimTypeLabel'
})
export class ClaimTypeLabelPipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(value: ClaimType): string {
        const mapClaimTypeToLabel = {
            [ClaimType.documentCreated]: 'documentCreated'
        };
        return this.transloco.translate(`claimType.${mapClaimTypeToLabel[value]}`);
    }
}
