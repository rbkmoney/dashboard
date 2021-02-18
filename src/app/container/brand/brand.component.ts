import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';


@Component({
    selector: 'dsh-brand',
    templateUrl: 'brand.component.html',
    styleUrls: ['./brand.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
    @Input() @coerceBoolean inverted: boolean;
    @Input() navigationLink = '/';

    get iconName(): string {
        return  this.inverted ? 'logo_white' : 'logo'
    }
}
