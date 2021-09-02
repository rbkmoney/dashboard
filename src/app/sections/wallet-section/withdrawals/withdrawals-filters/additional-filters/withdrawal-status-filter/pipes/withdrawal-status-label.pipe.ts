import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';

import { WithdrawalStatus } from '@dsh/api-codegen/wallet-api';

@Pipe({ name: 'withdrawalStatusLabel' })
export class WithdrawalStatusLabelPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) {}

    transform(value: WithdrawalStatus.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.translocoService.selectTranslate(`withdrawalStatus.${value}`);
    }
}
