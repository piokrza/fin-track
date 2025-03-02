import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { routes } from 'src/app';

import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { tokenInterceptor } from '#auth/interceptor';

const interceptors: HttpInterceptorFn[] = [tokenInterceptor];

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideHttpClient(withInterceptors(interceptors)),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
