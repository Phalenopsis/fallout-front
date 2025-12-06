import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { AuthService } from './app/service/auth-service';
import { JwtInterceptor } from './app/core/interceptor/jwt.interceptor';


bootstrapApplication(App, {
  providers: [
    // Router standalone
    provideRouter(routes),

    // HttpClient standalone avec interceptors injectés depuis DI
    provideHttpClient(withInterceptorsFromDi()),

    // Tes services singleton
    AuthService,

    // Interceptor pour JWT
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
  .catch(err => console.error(err));
