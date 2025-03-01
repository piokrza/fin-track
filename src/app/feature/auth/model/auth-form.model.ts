import { FormControl, FormGroup } from '@angular/forms';

export type SigninForm = FormGroup<{
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}>;
