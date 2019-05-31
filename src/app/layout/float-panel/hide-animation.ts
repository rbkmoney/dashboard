import { trigger, state, style, transition, animate } from '@angular/animations';

export enum State {
    hided = 'hided'
}

export const hideAnimation = trigger('hide', [
    state(State.hided, style({ opacity: 0 })),
    transition(`* <=> ${State.hided}`, [animate('.25s ease')]),
]);
