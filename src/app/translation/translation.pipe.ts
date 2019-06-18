import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
    name: 'lc',
    pure: false
})
export class LocalePipe implements PipeTransform {
    constructor(private translate: TranslationService) {}

    transform(key: string): string {
        const str = this.translate.locale[key];
        if (str) {
            return str;
        } else {
            console.warn(`${key} is missing in locale file.`);
            return key;
        }
    }
}
