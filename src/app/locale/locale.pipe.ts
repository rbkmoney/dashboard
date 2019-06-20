import { Pipe, PipeTransform } from '@angular/core';
import get from 'lodash.get';
import { LocaleService } from './locale.service';

@Pipe({
    name: 'lc',
    pure: false
})
export class LocalePipe implements PipeTransform {
    constructor(private localeService: LocaleService) {}

    transform(key: string): string {
        const str = get(this.localeService.locale, key, key);
        if (str === key) {
            console.warn(`${key} is missing in locale file.`);
        }
        return str;
    }
}
