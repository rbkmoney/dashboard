import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ThemeName } from '../../../../theme-manager';

@Component({
    selector: 'dsh-documentation',
    templateUrl: 'documentation.component.html',
    styleUrls: ['documentation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent {
    @Input() currentThemeName: ThemeName;

    goToDocumentation(): void {
        window.open('https://help.rbkmoney.com/lk/lk/', '_blank');
    }
}
