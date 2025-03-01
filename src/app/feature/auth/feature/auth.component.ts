import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '#auth/service';

@Component({
  selector: 'ft-auth',
  template: `
    <!--  -->
    <h1>hello auth!</h1>
  `,
})
export class AuthComponent implements OnInit {
  readonly #authService = inject(AuthService);

  ngOnInit(): void {
    this.#authService.testLoad$().subscribe();
  }
}
