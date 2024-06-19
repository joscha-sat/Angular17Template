import { animate, style, transition, trigger } from '@angular/animations';

export const slideShortAnimation = trigger('slide-short', [
  transition(':enter', [
    style({ transform: 'translate(20px, 0px)' }),
    animate('300ms ease', style({ transform: 'translate(0,0)' })),
  ]),
  transition(':leave', [
    animate('250ms ease', style({ transform: 'translate(10px,0px)' })),
  ]),
]);
