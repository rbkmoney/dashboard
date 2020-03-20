import { animate, style, transition, trigger } from '@angular/animations';

export const hideAnimation = trigger('hide', [
    transition(':enter', [style({ opacity: 0 }), animate('.35s ease', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('.35s ease', style({ opacity: 0 }))])
]);
