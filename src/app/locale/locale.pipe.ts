import { Pipe, PipeTransform } from '@angular/core';

import { LocaleService } from './locale.service';

@Pipe({
    name: 'lc'
})
export class LocalePipe implements PipeTransform {
    constructor(private localeService: LocaleService) {}

    transform(key: string): string {
        return this.localeService.mapDictionaryKey(key);
    }
}
