import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const expandCollapse: AnimationTriggerMetadata = trigger('expandCollapse', [
  state(
    'collapsed',
    style({
      height: '0',
      opacity: '0',
      marginTop: '0',
    })
  ),
  state(
    'expanded',
    style({
      height: '*',
      opacity: '1',
      marginTop: '16px',
    })
  ),
  transition('collapsed <=> expanded', [animate('0.2s ease-in-out')]),
]);
