import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, map, switchMap, catchError, filter, take, finalize } from 'rxjs/operators';
import { AuthApiService } from './api/auth-api.service';
import { UserDomainDTO } from '../core/models/user-domain.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken$ = new BehaviorSubject<string | null>(null);
  private currentUser$ = new BehaviorSubject<UserDomainDTO | null>(null);
  private refreshing = false;
  private api: AuthApiService = inject(AuthApiService);

  /** LOGIN */
  login(email: string, password: string): Observable<void> {
    return this.api.login({ email, password }).pipe(
      tap(res => this.accessToken$.next(res.accessToken)), // stocke le token
      switchMap(() =>
        // récupère l'utilisateur complet après login
        this.api.getCurrentUser$().pipe(
          tap(user => this.currentUser$.next(user))
        )
      ),
      map(() => void 0)
    );
  }

  /** REGISTER */
  register(email: string, password: string): Observable<void> {
    return this.api.register({ email, password }).pipe(map(() => void 0));
  }

  /** LOGOUT */
  logout(): Observable<void> {
    return this.api.logout().pipe(
      tap(() => this.clearSession()),
      map(() => void 0),
      catchError(err => {
        this.clearSession();
        return of(void 0);
      })
    );
  }

  /** Observable pour l'utilisateur courant */
  user$(): Observable<UserDomainDTO | null> {
    return this.currentUser$.asObservable();
  }

  /** Observable pour le token */
  token$(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }

  /** Vérifie si l'utilisateur est connecté */
  isLogged(): boolean {
    return !!this.currentUser$.value;
  }


  /** Refresh token automatique */
  refreshToken(): Observable<void> {
    if (this.refreshing) {
      return this.accessToken$.pipe(
        filter(Boolean),
        take(1),
        map(() => void 0)
      );
    }

    this.refreshing = true;

    return this.api.refresh().pipe(
      tap(res => this.accessToken$.next(res.accessToken)),
      switchMap(() => this.api.getCurrentUser$()),
      tap(user => this.currentUser$.next(user)),
      map(() => void 0),
      catchError(() => {
        this.clearSession();
        return throwError(() => new Error('Session expired'));
      }),
      finalize(() => (this.refreshing = false))
    );
  }

  /** Init session au bootstrap, ne bloque jamais */
  initSession(): Observable<void> {
    return this.api.getCurrentUser$().pipe(
      tap(user => this.currentUser$.next(user)),
      map(() => void 0),
      catchError(err => {
        // 401 = non connecté → ok
        if (err.status === 401) this.clearSession();
        return of(void 0);
      })
    );
  }

  /** Supprime session */
  private clearSession() {
    this.accessToken$.next(null);
    this.currentUser$.next(null);
  }

  /** Décode JWT */
  private decodeToken(token: string): any | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  /** Vérifie expiration du JWT */
  public isTokenValid(): boolean {
    const token = this.accessToken$.value;
    if (!token) return false;
    const payload = this.decodeToken(token);
    return payload?.exp ? payload.exp * 1000 > Date.now() : false;
  }

  /** Récupère l'utilisateur courant */
  getCurrentUser$(): Observable<UserDomainDTO | null> {
    return this.currentUser$.asObservable();
  }

  refreshCurrentUser(): void {
    this.api.getCurrentUser$().pipe(
      tap(user => this.currentUser$.next(user))
    ).subscribe();
  }
}
