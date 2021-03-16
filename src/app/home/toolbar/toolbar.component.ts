import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

import { ToolbarLinksService } from './toolbar-links.service';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [ToolbarLinksService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @Input() @coerceBoolean inverted: boolean;
    @Input() logoName: string;

    links$ = this.toolbarLinksService.links$;
    active$ = this.toolbarLinksService.active$;

    constructor(private toolbarLinksService: ToolbarLinksService) {}
}
