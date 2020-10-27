import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { BrandType } from '../brand';
import { LinkId, ToolbarLinksService } from './toolbar-links.service';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [ToolbarLinksService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @Input() brandType: BrandType = BrandType.normal;

    links$ = this.toolbarLinksService.links$;
    inverted$ = this.toolbarLinksService.active$.pipe(map((active) => active.id === LinkId.main));
    active$ = this.toolbarLinksService.active$;

    constructor(private toolbarLinksService: ToolbarLinksService) {}
}
