import {
    trigger,
    sequence,
    state,
    stagger,
    animate,
    transition,
    style,
    query,
  } from '@angular/animations';


  export const ScaleIn = trigger('scaleIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.4)' }),
      animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
    ]),
  ])

  export const fadeIn = trigger('fadeIn', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms ease-out', style({ opacity: 1 })),
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('500ms ease-out', style({ opacity: 0 })),
        ]),
      ])

  