import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersEffects } from './users/user.effects';
import { provideState, provideStore } from '@ngrx/store';
import { UsersReducer } from './users/user/user.store';
import { provideEffects } from '@ngrx/effects';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),
    provideStore(),
    provideState(UsersReducer),
    provideEffects(UsersEffects),
    importProvidersFrom(BrowserAnimationsModule)
  ]
};
