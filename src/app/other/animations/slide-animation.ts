import { animate, style, transition, trigger } from '@angular/animations';

export const slideAnimation = trigger('slide', [
  transition(':enter', [
    style({ transform: 'translate(500px, 0px)' }),
    animate('250ms', style({ transform: 'translate(0,0)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translate(0px,0px)' }),
    animate('250ms', style({ transform: 'translate(500px,0px)' })),
  ]),
]);
