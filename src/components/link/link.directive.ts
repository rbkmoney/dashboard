import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: 'a[dshLink]',
})
export class LinkDirective {
    @HostBinding(`class.dsh-link`) linkClass = true;
}
