import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    templateUrl: 'operations.component.html',
    styleUrls: ['operations.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OperationsComponent {
    links = [
        {
            path: 'payments',
            label: 'Платежи'
        },
        {
            path: 'refunds',
            label: 'Возвраты'
        },
        {
            path: 'invoices',
            label: 'Инвойсы'
        }
    ];
}
