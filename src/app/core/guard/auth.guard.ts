import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../service/auth-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean | UrlTree> {
        // Si on a déjà un token en mémoire et qu'il est valide → accès autorisé
        if (this.authService.isTokenValid()) {
            return of(true);
        }

        // Sinon, on tente un refresh depuis le cookie HttpOnly
        return this.authService.refreshToken().pipe(
            map(() => {
                // refresh réussi → accès autorisé
                return true;
            }),
            catchError(() => {
                // refresh échoué → redirige vers login
                return of(this.router.createUrlTree(['/login']));
            })
        );
    }
}
