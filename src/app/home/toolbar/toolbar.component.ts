import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContextService } from '@dsh/app/shared/services/context';
import { SectionsLinksService } from '@dsh/app/shared/services/sections-links';
import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @Input() @coerceBoolean inverted: boolean;
    @Input() logoName: string;

    sectionLinks$ = this.sectionsLinksService.sectionLinks$;
    organization$ = this.contextService.organization$;

    constructor(private sectionsLinksService: SectionsLinksService, private contextService: ContextService) {}
}
