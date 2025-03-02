import { FormControl, FormGroup } from '@angular/forms';

export type LoginForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;

export type SigninForm = FormGroup<{
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}>;
