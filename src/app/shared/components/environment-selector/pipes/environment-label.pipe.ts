import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

@Pipe({ name: 'environmentLabel' })
export class EnvironmentLabelPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) {}

    transform(value: RealmEnum): Observable<string> {
        if (!value) return of('');
        return this.translocoService.selectTranslate(value, {}, 'environment-selector');
    }
}
