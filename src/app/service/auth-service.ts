import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of, firstValueFrom } from 'rxjs';
import { tap, catchError, map, filter, take, switchMap, finalize } from 'rxjs/operators';
import { AuthApiService, LoginResponseDTO, UserLoginDTO, UserRegistrationDTO } from './api/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private accessToken$ = new BehaviorSubject<string | null>(null);
  private currentUser$ = new BehaviorSubject<string | null>(null);
  private refreshing = false;

  constructor(private authApi: AuthApiService) { }

  /** LOGIN */
  async login(email: string, password: string): Promise<void> {
    const payload: UserLoginDTO = { email, password };

    try {
      const res = await firstValueFrom(
        this.authApi.login(payload).pipe(
          tap((res) => this.setToken(res.accessToken, res.user)),
          map(() => void 0)
        )
      );
    } catch (err: any) {
      throw err;  // important pour que le composant le récupère
    }
  }

  /** REGISTER */
  async register(email: string, password: string): Promise<void> {
    const payload: UserRegistrationDTO = { email, password };

    await firstValueFrom(
      this.authApi.register(payload).pipe(
        tap(res => console.log('API result:', res)),
        map(() => void 0)
      )
    );
  }

  /** LOGOUT */
  async logout(): Promise<void> {
    return firstValueFrom(
      this.authApi.logout().pipe(
        tap(() => this.clearToken()),
        map(() => void 0),
        catchError(err => {
          console.warn('Logout error (ignored)', err);
          this.clearToken();
          return of(void 0);
        })
      ));
  }

  /** TOKEN GETTERS */
  getToken(): string | null {
    return this.accessToken$.value;
  }

  getUser(): string | null {
    return this.currentUser$.value;
  }

  token$(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }

  user$(): Observable<string | null> {
    return this.currentUser$.asObservable();
  }

  isLogged(): boolean {
    return !!this.accessToken$.value && !!this.currentUser$.value && this.isTokenValid();
  }

  /** Vérifie expiration du JWT */
  isTokenValid(): boolean {
    const token = this.accessToken$.value;
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload?.exp) return false;

    return payload.exp * 1000 > Date.now();
  }

  /** Automatic refresh */
  refreshToken(): Observable<void> {

    // Déjà en cours → attendre qu'il finisse
    if (this.refreshing) {
      return this.accessToken$.pipe(
        filter(token => token !== null),
        take(1),
        map(() => void 0)
      );
    }

    this.refreshing = true;

    return this.authApi.refresh().pipe(
      tap(res => {
        this.accessToken$.next(res.accessToken);

        const payload = this.decodeToken(res.accessToken);
        if (payload?.sub) this.currentUser$.next(payload.sub);
      }),
      map(() => void 0),
      catchError(err => {
        this.clearToken();
        return throwError(() => new Error('Session expired'));
      }),
      finalize(() => { this.refreshing = false; })
    );
  }

  /** Decode JWT */
  private decodeToken(token: string): any | null {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  private setToken(token: string, user: string) {
    this.accessToken$.next(token);
    this.currentUser$.next(user);
  }

  private clearToken() {
    this.accessToken$.next(null);
    this.currentUser$.next(null);
  }
}
