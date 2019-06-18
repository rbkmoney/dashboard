import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from './locale.service';

@Pipe({
    name: 'lc',
    pure: false
})
export class LocalePipe implements PipeTransform {
    constructor(private localeService: LocaleService) {}

    transform(key: string): string {
        const str = this.localeService.locale[key];
        if (str) {
            return str;
        } else {
            console.warn(`${key} is missing in locale file.`);
            return key;
        }
    }
}
