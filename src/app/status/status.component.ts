import { Component, Input, HostBinding } from '@angular/core';

export enum Color {
    success = 'success',
    pending = 'pending',
    warn = 'warn'
}

@Component({
    selector: 'dsh-status',
    templateUrl: 'status.component.html',
    styleUrls: ['status.component.scss']
})
export class StatusComponent {
    @Input()
    color: Color;

    @HostBinding(`class.dsh-status`) baseClass = true;
}
