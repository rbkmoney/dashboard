import { Component, Input } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-laptop-grid',
    templateUrl: './laptop-grid.component.html',
    styleUrls: ['./laptop-grid.component.scss'],
})
export class LaptopGridComponent {
    @Input()
    @coerceBoolean
    inverted: boolean;
}
