import { animate, AnimationTriggerMetadata, query, style, transition, trigger } from '@angular/animations';

export const routeTransition: AnimationTriggerMetadata = trigger('routeTransition', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, display: 'none' })], { optional: true }),
    query(':enter', [animate('150ms', style({ opacity: 1, display: 'block' }))], { optional: true }),
  ]),
]);
