import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    // Ne jamais refresh sur login/register
    const skipRefresh = req.url.endsWith('/auth/login') || req.url.endsWith('/auth/register');

    return authService.token$().pipe(
        take(1),
        switchMap(token => {
            let authReq = req;
            if (token) {
                authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
            }

            return next(authReq).pipe(
                catchError(err => {
                    if (!skipRefresh && err.status === 401) {
                        // Tentative de refresh
                        return authService.refreshToken().pipe(
                            switchMap(() => authService.token$().pipe(
                                take(1),
                                switchMap(newToken => {
                                    if (!newToken) return throwError(() => err);

                                    const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
                                    return next(retryReq);
                                })
                            ))
                        );
                    }
                    return throwError(() => err);
                })
            );
        })
    );
};
