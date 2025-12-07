import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();
    let authReq = req;

    // Ajout du token si valide
    if (token && authService.isTokenValid()) {
        authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    // Ne jamais refresh sur login ou register
    const skipRefresh = req.url.endsWith('/auth/login') || req.url.endsWith('/auth/register');

    return next(authReq).pipe(
        catchError(err => {
            if (!skipRefresh && err.status === 401) {
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        const newToken = authService.getToken();
                        if (!newToken) return throwError(() => err);

                        return next(
                            req.clone({
                                setHeaders: { Authorization: `Bearer ${newToken}` }
                            })
                        );
                    })
                );
            }
            return throwError(() => err);
        })
    );
};
