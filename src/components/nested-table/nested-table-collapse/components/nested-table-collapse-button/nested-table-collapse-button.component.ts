import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, shareReplay } from 'rxjs/operators';

import { ExpansionService } from '@dsh/components/nested-table/nested-table-collapse/services/expansion/expansion.service';

import { indicatorRotate, IndicatorRotateState } from './indicator-rotate';

@UntilDestroy()
@Component({
    selector: 'dsh-nested-table-collapse-button',
    templateUrl: 'nested-table-collapse-button.component.html',
    styleUrls: ['nested-table-collapse-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [indicatorRotate],
})
export class NestedTableCollapseButtonComponent {
    animationState$ = this.expansionService.expanded$.pipe(
        map((expanded) => (expanded ? IndicatorRotateState.expanded : IndicatorRotateState.collapsed)),
        untilDestroyed(this),
        shareReplay(1)
    );

    constructor(private expansionService: ExpansionService) {}

    @HostListener('click') onClick() {
        this.expansionService.toggle();
    }
}
