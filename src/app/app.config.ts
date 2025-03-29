import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { routes } from 'src/app';

import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { firebaseConfig } from '#core/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    providePrimeNG({ theme: { preset: Aura } }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
  ],
};
