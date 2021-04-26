import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, shareReplay } from 'rxjs/operators';

import { ExpansionService } from '../../services/expansion/expansion.service';
import { INDICATOR_ROTATE } from './indicator-rotate';
import { IndicatorRotateState } from './types/indicator-rotate';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table-collapse-button',
    templateUrl: 'nested-table-collapse-button.component.html',
    styleUrls: ['nested-table-collapse-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [INDICATOR_ROTATE],
})
export class NestedTableCollapseButtonComponent {
    animationState$ = this.expansionService.expanded$.pipe(
        map((expanded) => (expanded ? IndicatorRotateState.Expanded : IndicatorRotateState.Collapsed)),
        untilDestroyed(this),
        shareReplay(1)
    );

    constructor(private expansionService: ExpansionService) {}

    @HostListener('click') onClick() {
        this.expansionService.toggle();
    }
}
