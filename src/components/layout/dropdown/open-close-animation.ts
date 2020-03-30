import { animate, state, style, transition, trigger } from '@angular/animations';

export enum State {
    open = 'open',
    closed = 'closed'
}

export const openCloseAnimation = trigger('openClose', [
    state(
        State.open,
        style({
            opacity: 1,
            transform: 'rotateX(0deg)',
            'transform-origin': '0% 0px'
        })
    ),
    state(
        State.closed,
        style({
            opacity: 0,
            transform: 'rotateX(-15deg)',
            'transform-origin': '50% -50px'
        })
    ),
    transition(`${State.open} <=> ${State.closed}`, [animate('0.25s ease')])
]);
