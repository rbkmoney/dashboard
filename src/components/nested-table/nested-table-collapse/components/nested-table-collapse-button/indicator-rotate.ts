import { animate, state, style, transition, trigger } from '@angular/animations';

export const ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export enum IndicatorRotateState {
    collapsed = 'collapsed',
    expanded = 'expanded',
}

export const indicatorRotate = trigger('indicatorRotate', [
    state([IndicatorRotateState.collapsed, 'void'].join(','), style({ transform: 'rotate(90deg)' })),
    state(IndicatorRotateState.expanded, style({ transform: 'rotate(180deg)' })),
    transition('expanded <=> collapsed, void => collapsed', animate(ANIMATION_TIMING)),
]);
