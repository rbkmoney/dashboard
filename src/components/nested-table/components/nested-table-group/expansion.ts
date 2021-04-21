import { animate, state, style, transition, trigger } from '@angular/animations';

export const ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const EXPANSION = trigger('expansion', [
    state('void', style({ height: '0px', padding: '0', opacity: 0.5 })),
    state('*', style({ height: '*', padding: '*', opacity: 1 })),
    transition('* <=> *', animate(ANIMATION_TIMING)),
]);
