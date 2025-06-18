import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { breakpoints } from '#ui/constant';
import { Breakpoint } from '#ui/model';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  readonly #breakpointObserver = inject(BreakpointObserver);

  observe(breakpoint: Breakpoint): Signal<boolean> {
    return toSignal(
      this.#breakpointObserver.observe([`(min-width: ${breakpoints.get(breakpoint)}px)`]).pipe(map(({ matches }) => matches)),
      { requireSync: true }
    );
  }
}
