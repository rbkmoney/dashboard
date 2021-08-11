import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ConfigService } from '../../../../config';
import { ThemeName } from '../../../../theme-manager';

@Component({
    selector: 'dsh-documentation',
    templateUrl: 'documentation.component.html',
    styleUrls: ['documentation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent {
    @Input() currentThemeName: ThemeName;

    constructor(private config: ConfigService) {}

    goToDocumentation(): void {
        window.open(`${this.config.docsEndpoints.help}/lk/lk`, '_blank');
    }
}
