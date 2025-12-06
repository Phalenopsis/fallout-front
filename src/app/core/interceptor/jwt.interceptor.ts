import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../service/auth-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        // Cloner la requête pour ajouter le token si valide
        let authReq = req;
        if (token && this.authService.isTokenValid()) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(authReq).pipe(
            catchError(err => {
                // Si 401, tenter le refresh
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    return this.authService.refreshToken().pipe(
                        switchMap(() => {
                            const newToken = this.authService.getToken();
                            if (!newToken) {
                                return throwError(() => err);
                            }
                            // Refaire la requête originale avec le nouveau token
                            const newReq = req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${newToken}`
                                }
                            });
                            return next.handle(newReq);
                        })
                    );
                }

                return throwError(() => err);
            })
        );
    }
}
