import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: 'actionbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
    @Input() @coerceBoolean inverted = false;
}
