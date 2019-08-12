import { Pipe, PipeTransform } from '@angular/core';

import { LocaleDictionaryService } from './locale-dictionary';

@Pipe({
    name: 'lc'
})
export class LocalePipe implements PipeTransform {
    constructor(private localeService: LocaleDictionaryService) {}

    transform(key: string, templateData?: object): string {
        return this.localeService.mapDictionaryKey(key, templateData);
    }
}
