import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDomainDTO } from '../../core/models/user-domain.dto';
import { environment } from '../../../environments/environment';

export interface UserRegistrationDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  user: string;
}

export interface ApiErrorDTO {
  error: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);

  login(data: UserLoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.baseUrl}/login`, data, {
      withCredentials: true,
    });
  }

  register(data: UserRegistrationDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.baseUrl}/register`, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  refresh(): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/refresh`,
      {},
      { withCredentials: true },
    );
  }

  getCurrentUser$(): Observable<UserDomainDTO> {
    return this.http.get<UserDomainDTO>(`${environment.apiUrl}/user`, { withCredentials: true });
  }
}
