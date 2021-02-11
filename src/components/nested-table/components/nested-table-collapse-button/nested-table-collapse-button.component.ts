import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, shareReplay } from 'rxjs/operators';

import { NestedTableCollapseDirective } from '@dsh/components/nested-table/directives/nested-table-group/nested-table-collapse.directive';

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
    constructor(@Inject(NestedTableCollapseDirective) private collapseDirective: NestedTableCollapseDirective) {}

    animationState$ = this.collapseDirective.expanded$.pipe(
        map((expanded) => (expanded ? IndicatorRotateState.expanded : IndicatorRotateState.collapsed)),
        untilDestroyed(this),
        shareReplay(1)
    );

    toggle() {
        this.collapseDirective.toggle();
    }
}
