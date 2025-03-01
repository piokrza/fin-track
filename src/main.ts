/* eslint-disable no-console */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, AppComponent } from 'src/app';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
