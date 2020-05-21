import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
    name: 'yesNo',
})
export class YesNoPipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(bool: boolean, strict = false): string {
        if (strict && typeof bool !== 'boolean') {
            return null;
        }
        return bool ? this.transloco.translate('yes') : this.transloco.translate('no');
    }
}
