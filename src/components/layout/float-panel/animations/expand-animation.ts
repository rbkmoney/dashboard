import { animate, state, style, transition, trigger } from '@angular/animations';

export enum ExpandState {
    Expanded = 'Expanded',
    Collapsed = 'Collapsed',
}

const animation = animate('150ms ease');

export const expandAnimation = trigger('expand', [
    state(ExpandState.Expanded, style({ height: '{{height}}px' }), {
        params: { height: 0 },
    }),
    transition(`${ExpandState.Collapsed} <=> ${ExpandState.Expanded}`, [animation]),
    transition(`${ExpandState.Expanded} => void`, [animation]),
]);
