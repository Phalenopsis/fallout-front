import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { jwtInterceptor } from './app/core/interceptor/jwt.interceptor';
import { inject, provideAppInitializer } from '@angular/core';
import { AuthService } from './app/service/auth-service';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor
      ])
    ),
    provideAppInitializer(() => inject(AuthService).initSession())
  ]
}).catch(err => console.error(err));
