import { Pipe, PipeTransform } from '@angular/core';

import { ClaimChangeset } from '../../api-codegen/claim-management/swagger-codegen';
import { getClaimType } from '../../view-utils/claims';

@Pipe({
    name: 'changesetToType',
})
export class ChangesetToTypePipe implements PipeTransform {
    transform(changeset: ClaimChangeset): string {
        return getClaimType(changeset);
    }
}
