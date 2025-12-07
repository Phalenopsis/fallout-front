import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    private baseUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient) { }

    /**
     * Enregistre un nouvel utilisateur
     */
    register(data: UserRegistrationDTO): Observable<UserResponseDTO> {
        return this.http.post<UserResponseDTO>(`${this.baseUrl}/register`, data);
    }

    /**
     * Connecte un utilisateur et récupère l'accessToken + refreshToken dans cookie
     */
    login(data: UserLoginDTO): Observable<LoginResponseDTO> {
        return this.http.post<LoginResponseDTO>(`${this.baseUrl}/login`, data, { withCredentials: true });
    }

    /**
     * Renouvelle le token à partir du refreshToken (cookie HttpOnly)
     */
    refresh(): Observable<{ accessToken: string }> {
        return this.http.post<{ accessToken: string }>(`${this.baseUrl}/refresh`, {}, { withCredentials: true });
    }

    /**
     * Déconnexion : supprime le cookie côté serveur
     */
    logout(): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
    }

    /**
     * Récupère l'utilisateur actuellement connecté
     * (si tu as un endpoint /auth/me côté back)
     */
    getCurrentUser(): Observable<{ username: string }> {
        const userUrl = 'http://localhost:8080/user'
        return this.http.get<{ username: string }>(`${userUrl}`, { withCredentials: true });
    }
}
