import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: 'dsh-card-content'
})
export class CardContentDirective {
    @HostBinding('class.dsh-card-content') class = true;
}

@Directive({
    selector: `dsh-card-title, [dsh-card-title], [dshCardTitle]`,
    host: {
        class: 'dsh-card-title'
    }
})
export class CardTitleDirective {
    @HostBinding('class.dsh-card-title') class = true;
}

@Directive({
    selector: 'dsh-card-actions',
    exportAs: 'dshCardActions'
})
export class CardActionsDirective {
    @HostBinding('class.dsh-card-actions') class = true;
}
