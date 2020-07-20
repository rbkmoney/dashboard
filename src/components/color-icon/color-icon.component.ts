import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'dsh-color-icon',
    templateUrl: 'color-icon.component.html',
})
export class ColorIconComponent {
    @Input()
    icon: string;

    @Input()
    color: 'text' | 'contrast-text';

    @HostBinding('class.dsh-color-icon') class = true;
}
