import { trigger, state, style, transition, animate } from '@angular/animations';

export enum State {
    expanded = 'expanded',
    collapsed = 'collapsed'
}

export const expandAnimation = trigger('expand', [
    state(
        State.expanded,
        style({
            height: '{{height}}px'
        }),
        {
            params: { height: 0 }
        }
    ),
    state(
        State.collapsed,
        style({
            height: 0
        })
    ),
    transition(`${State.expanded} <=> ${State.collapsed}`, [animate('0.3s ease-in-out')])
]);
