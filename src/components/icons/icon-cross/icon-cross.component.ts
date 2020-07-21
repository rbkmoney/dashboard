import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-icon-cross',
    templateUrl: 'icon-cross.component.html',
})
export class IconCrossComponent {
    @Input()
    color: 'text' | 'contrast-text';
}
