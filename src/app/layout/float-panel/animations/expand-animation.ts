import { trigger, state, style, transition, animate } from '@angular/animations';

export enum State {
    expanded = 'expanded',
    collapsed = 'collapsed'
}

const animation = animate('0.35s ease');

export const expandAnimation = trigger('expand', [
    state(State.expanded, style({ height: '{{height}}px' }), { params: { height: 0 } }),
    transition(`${State.collapsed} <=> ${State.expanded}`, [animation]),
    transition(`${State.expanded} => void`, [animation])
]);
