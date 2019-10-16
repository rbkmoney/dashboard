import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'highlight'
})
export class HighlightSearchPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(value: string, args: string): SafeHtml {
        if (!args) {
            return value;
        }

        const re = new RegExp(args, 'gi');
        const match = value.match(re);

        if (!match) {
            return value;
        }

        const replacedValue = value.replace(re, '<mark class="dsh-dadata-autocomplete-mark">' + match[0] + '</mark>');
        return this.sanitizer.bypassSecurityTrustHtml(replacedValue);
    }
}
