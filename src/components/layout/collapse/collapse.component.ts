import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { bodyExpansion, indicatorRotate } from './collapse-animation';

export type CollapseAnimationState = 'expanded' | 'collapsed';

@Component({
    selector: 'dsh-collapse',
    templateUrl: 'collapse.component.html',
    styleUrls: ['collapse.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [bodyExpansion, indicatorRotate],
})
export class CollapseComponent {
    @Input() title: string;

    expanded = false;

    get expandedState(): CollapseAnimationState {
        return this.expanded ? 'expanded' : 'collapsed';
    }

    toggle() {
        this.expanded = !this.expanded;
    }
}
