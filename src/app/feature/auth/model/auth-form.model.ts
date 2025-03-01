import { FormControl, FormGroup } from '@angular/forms';

export type AuthForm = FormGroup<{
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}>;
