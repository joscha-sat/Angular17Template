import { animate, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('100ms ease-in', style({ opacity: 0.7 })),
  ]),
  transition(':leave', [animate('250ms ease', style({ opacity: 0 }))]),
]);
