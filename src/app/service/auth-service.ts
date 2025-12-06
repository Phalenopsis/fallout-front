import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject, from } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { AuthApiService, LoginResponseDTO, UserLoginDTO, UserRegistrationDTO } from './api/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private accessToken$ = new BehaviorSubject<string | null>(null);
  private currentUser$ = new BehaviorSubject<string | null>(null);
  private refreshing = false;

  constructor(private authApi: AuthApiService) { }

  /** Connexion utilisateur */
  login(email: string, password: string): Observable<void> {
    const payload: UserLoginDTO = { email, password };
    return this.authApi.login(payload).pipe(
      tap((res: LoginResponseDTO) => this.setToken(res.accessToken, res.user)),
      switchMap(() => of(void 0)),
      catchError(err => throwError(() => new Error(err?.error?.message || 'Login failed')))
    );
  }

  /** Inscription utilisateur */
  register(email: string, password: string): Observable<void> {
    const payload: UserRegistrationDTO = { email, password };
    return this.authApi.register(payload).pipe(
      switchMap(() => of(void 0)),
      catchError(err => throwError(() => new Error(err?.error?.message || 'Registration failed')))
    );
  }

  /** Déconnexion */
  logout(): Observable<void> {
    return this.authApi.logout().pipe(
      tap(() => this.clearToken()),
      switchMap(() => of(void 0)),
      catchError(err => {
        console.warn('Logout error (ignored)', err);
        this.clearToken();
        return of(void 0);
      })
    );
  }

  /** Retourne le token JWT actuel */
  getToken(): string | null {
    return this.accessToken$.value;
  }

  /** Retourne l'utilisateur connecté */
  getUser(): string | null {
    return this.currentUser$.value;
  }

  /** Observable du token */
  token$(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }

  /** Observable de l'utilisateur */
  user$(): Observable<string | null> {
    return this.currentUser$.asObservable();
  }

  /** Vérifie si connecté */
  isLogged(): boolean {
    return !!this.accessToken$.value && !!this.currentUser$.value && this.isTokenValid();
  }

  /** Vérifie la validité du token côté client (exp) */
  isTokenValid(): boolean {
    const token = this.accessToken$.value;
    if (!token) return false;
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }

  /** Refresh automatique du token si nécessaire */
  refreshToken(): Observable<void> {
    if (this.refreshing) {
      // Si déjà en cours, attend que le refresh finisse
      return this.accessToken$.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => of(void 0))
      );
    }

    this.refreshing = true;
    return this.authApi.refresh().pipe(
      tap(res => {
        this.accessToken$.next(res.accessToken);
        const payload = this.decodeToken(res.accessToken);
        if (payload?.sub) {
          this.currentUser$.next(payload.sub);
        }
      }),
      switchMap(() => of(void 0)),
      catchError(err => {
        this.clearToken();
        return throwError(() => new Error('Session expired'));
      }),
      tap(() => (this.refreshing = false))
    );
  }

  /** Décode le JWT */
  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  /** Stocke token et utilisateur */
  private setToken(token: string, user: string) {
    this.accessToken$.next(token);
    this.currentUser$.next(user);
  }

  /** Supprime token et utilisateur */
  private clearToken() {
    this.accessToken$.next(null);
    this.currentUser$.next(null);
  }
}
