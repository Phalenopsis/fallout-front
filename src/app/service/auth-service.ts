import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage-service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private localStorageService: LocalStorageService) { }

  async login(username: string, password: string): Promise<void> {
    // Petit délai pour simuler un vrai appel réseau
    await new Promise(resolve => setTimeout(resolve, 600));

    // Vérification du mot de passe
    if (password === "admin") {
      this.localStorageService.setUser(username);
      return; // success
    }

    // Si mot de passe incorrect → on jette une erreur comme le backend le ferait
    throw new Error("Invalid credentials");
  }

  async register(username: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 600));

    console.log(`username: ${username} password : ${password}`);
  }

  logout() {
    this.localStorageService.clear();
  }


  isLogged(): boolean {
    if (this.localStorageService.getUser()) {
      return true;
    }
    return false;
  }

  getUser(): string {
    return this.localStorageService.getUser();
  }


}
