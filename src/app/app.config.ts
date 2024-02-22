import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore ,provideState} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { adminReducer } from './_store/admin/admin.reducer';
import { AdminEffects } from './_store/admin/admin.effects';
import { profileReducer } from './_store/profile/profile.reducer';
import { AuthInterceptorService } from './services/auth-interceptor.service';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    provideAnimations(),
    provideToastr(),
    provideStore({"admin":adminReducer,'profileVisible':profileReducer}),
    provideEffects([AdminEffects])
]
};
