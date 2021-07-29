import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';

import { StatusModificationUnit } from '@dsh/api-codegen/claim-management';

import { OPTION_LABELS } from '../types/option-labels';

@Pipe({ name: 'claimStatusesLabelPipe' })
export class ClaimStatusesLabelPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) {}

    transform(value: StatusModificationUnit.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.translocoService.selectTranslate(`statuses.${OPTION_LABELS[value]}`, {}, 'claim-status-filter');
    }
}
