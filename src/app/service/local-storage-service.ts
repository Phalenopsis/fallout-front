import { Injectable } from '@angular/core';
import { UserDomainDTO } from '../core/models/user-domain.dto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private USER = "user";

  setUser(user: UserDomainDTO): void {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  getUser(): UserDomainDTO | null {
    const user = localStorage.getItem(this.USER);
    return user ? JSON.parse(user) : null;
  }

  clear() {
    localStorage.clear();
  }
}
