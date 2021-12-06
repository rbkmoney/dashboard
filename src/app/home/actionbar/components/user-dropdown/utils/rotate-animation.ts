import { trigger, state, style, transition, animate } from '@angular/animations';

export const ROTATE = trigger('rotate', [
    state('expanded', style({ transform: 'rotate(180deg)' })),
    transition('expanded <=> collapsed, void => collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
]);
