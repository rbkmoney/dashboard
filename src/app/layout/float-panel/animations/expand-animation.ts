import { trigger, state, style, transition, animate } from '@angular/animations';

export enum State {
    expanded = 'expanded'
}

export const expandAnimation = trigger('expand', [
    state(State.expanded, style({ height: '{{height}}px' }), { params: { height: 0 } }),
    transition(`* <=> ${State.expanded}`, [animate('0.25s ease')])
]);
