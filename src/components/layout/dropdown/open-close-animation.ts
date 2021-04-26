import { animate, state, style, transition, trigger } from '@angular/animations';

export enum State {
    Open = 'open',
    Closed = 'closed',
}

export const OPEN_CLOSE_ANIMATION = trigger('openClose', [
    state(
        State.Open,
        style({
            opacity: 1,
            transform: 'rotateX(0deg)',
            'transform-origin': '0% 0px',
        })
    ),
    state(
        State.Closed,
        style({
            opacity: 0,
            transform: 'rotateX(-15deg)',
            'transform-origin': '50% -50px',
        })
    ),
    transition(`${State.Open} <=> ${State.Closed}`, [animate('0.25s ease')]),
]);
