import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: 'a[dshLink]',
})
export class LinkDirective {
    @HostBinding(`class.dsh-link`) linkClass = true;
    @HostBinding(`class.dsh-body-1`) body1Class = true;
}
