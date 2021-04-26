import { animate, state, style, transition, trigger } from '@angular/animations';

export enum ExpandState {
    Expanded = 'expanded',
    Collapsed = 'collapsed',
}

const ANIMATION = animate('150ms ease');

export const EXPAND_ANIMATION = trigger('expand', [
    state(ExpandState.Expanded, style({ height: '{{height}}px' }), {
        params: { height: 0 },
    }),
    transition(`${ExpandState.Collapsed} <=> ${ExpandState.Expanded}`, [ANIMATION]),
    transition(`${ExpandState.Expanded} => void`, [ANIMATION]),
]);
