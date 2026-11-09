import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // Configuration du client HTTP
    provideHttpClient(
      // Avec les intercepteurs ...
      withInterceptors([
        authInterceptor
        // demoInterceptor, // DemoInterceptor
        // jwtInterceptor, // JWT Interceptor
        // apiUrlInterceptor // API URL Interceptor
      ])
    )
  ]
};
