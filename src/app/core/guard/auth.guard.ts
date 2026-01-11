import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../service/auth-service';

/**
 * Guard standalone pour protéger les routes.
 * Vérifie si un token valide existe en mémoire, sinon tente un refresh via cookie HttpOnly.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si token valide en mémoire → accès autorisé
  if (authService.isTokenValid()) {
    return true;
  }

  // Sinon, tenter un refresh
  return authService.refreshToken().pipe(
    map(() => true), // refresh réussi → accès autorisé
    catchError(() => of(router.createUrlTree(['/terminal/login']))), // échec → redirection vers login
  );
};
