import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { jwtInterceptor } from './app/core/interceptor/jwt.interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        jwtInterceptor
      ])
    )
  ]
}).catch(err => console.error(err));
