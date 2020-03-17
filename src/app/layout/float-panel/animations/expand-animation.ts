import { trigger, state, style, transition, animate } from '@angular/animations';

export enum ExpandState {
    expanded = 'expanded',
    collapsed = 'collapsed'
}

const animation = animate('150ms ease');

export const expandAnimation = trigger('expand', [
    state(ExpandState.expanded, style({ height: '{{height}}px' }), {
        params: { height: 0 }
    }),
    transition(`${ExpandState.collapsed} <=> ${ExpandState.expanded}`, [animation]),
    transition(`${ExpandState.expanded} => void`, [animation])
]);
