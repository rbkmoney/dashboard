import { Component, HostBinding } from '@angular/core';

@Component({
    template: '{{text}}',
    styleUrls: ['text.component.scss'],
})
export class TextComponent {
    @HostBinding('class.dsh-headline') dshHeadlineClass = true;

    text: string;
}
