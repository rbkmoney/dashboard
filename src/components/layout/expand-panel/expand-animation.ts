import { animate, state, style, transition, trigger } from '@angular/animations';

export enum ExpandState {
    expanded = 'expanded',
    collapsed = 'collapsed'
}

const animation = animate('150ms ease');

export const expandAnimation = trigger('expand', [
    state(ExpandState.expanded, style({ height: '{{height}}px', opacity: 1 }), { params: { height: 0 } }),
    state(ExpandState.collapsed, style({ height: 0, opacity: 0 })),
    transition(`* <=> *`, [animation])
]);
