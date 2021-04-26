import { animate, state, style, transition, trigger } from '@angular/animations';

import { IndicatorRotateState } from './types/indicator-rotate';

export const ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const INDICATOR_ROTATE = trigger('indicatorRotate', [
    state([IndicatorRotateState.Collapsed, 'void'].join(','), style({ transform: 'rotate(90deg)' })),
    state(IndicatorRotateState.Expanded, style({ transform: 'rotate(180deg)' })),
    transition('expanded <=> collapsed, void => collapsed', animate(ANIMATION_TIMING)),
]);
