import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { bodyExpansion, indicatorRotate } from './collapse-animation';
import { CollapseAnimationState } from './types/collapse-animation-state';

type ExpandDirection = 'up' | 'down';
type AnimationState = { value: CollapseAnimationState; params: { rotateDeg: number } };

const EXPAND_DIRECTION: ExpandDirection = 'down';
const EXPANDED = false;

@Component({
    selector: 'dsh-collapse',
    templateUrl: 'collapse.component.html',
    styleUrls: ['collapse.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [bodyExpansion, indicatorRotate],
})
export class CollapseComponent {
    @Input() title: string;
    @Input() expandDirection: ExpandDirection = EXPAND_DIRECTION;

    expanded: boolean = EXPANDED;

    get animationState(): AnimationState {
        return {
            value: this.expanded ? CollapseAnimationState.Expanded : CollapseAnimationState.Collapsed,
            params: { rotateDeg: this.expandDirection === 'down' ? 180 : 0 },
        };
    }

    toggle() {
        this.expanded = !this.expanded;
    }
}
