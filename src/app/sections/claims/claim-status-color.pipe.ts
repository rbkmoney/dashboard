import { Pipe, PipeTransform } from '@angular/core';

import { StatusColor } from '../../theme-manager';
import { StatusModificationUnit } from '../../api-codegen/claim-management/swagger-codegen';

@Pipe({
    name: 'claimStatusColor'
})
export class ClaimStatusColorPipe implements PipeTransform {
    transform(status: StatusModificationUnit.StatusEnum): StatusColor {
        const statusEnum = StatusModificationUnit.StatusEnum;
        switch (status) {
            case statusEnum.Accepted:
                return StatusColor.success;
            case statusEnum.Denied:
                return StatusColor.warn;
            case statusEnum.Pending:
            case statusEnum.PendingAcceptance:
            case statusEnum.Review:
                return StatusColor.pending;
            case statusEnum.Revoked:
                return StatusColor.neutral;
        }
    }
}
