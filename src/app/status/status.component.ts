import { Component, Input, HostBinding } from '@angular/core';

export enum Color {
    success = 'success',
    warn = 'warn',
    error = 'error'
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
