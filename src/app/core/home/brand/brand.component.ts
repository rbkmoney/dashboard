import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

import { ConfigService } from '../../../config';

@Component({
    selector: 'dsh-brand',
    templateUrl: 'brand.component.html',
    styleUrls: ['./brand.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
    @Input() @coerceBoolean inverted: boolean;
    @Input() navigationLink = '/';

    size: { width?: string; height?: string } = this.configService.theme.logo.size;

    constructor(private configService: ConfigService) {}

    get iconName(): string {
        return this.inverted ? 'logo_white' : 'logo';
    }
}
