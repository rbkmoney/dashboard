import { Pipe, PipeTransform } from '@angular/core';

import { StatusModificationUnit } from '@dsh/api-codegen/claim-management/swagger-codegen';

import { StatusColor } from '../../../theme-manager';

@Pipe({
    name: 'claimStatusColor',
})
export class ClaimStatusColorPipe implements PipeTransform {
    transform(status: StatusModificationUnit.StatusEnum | string): StatusColor {
        const statusEnum = StatusModificationUnit.StatusEnum;
        switch (status) {
            case statusEnum.Accepted:
                return StatusColor.success;
            case statusEnum.Denied:
                return StatusColor.warn;
            case statusEnum.Pending:
            case statusEnum.Review:
                return StatusColor.pending;
            case statusEnum.Revoked:
                return StatusColor.neutral;
        }
    }
}
