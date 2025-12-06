import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private USER = "user";

  setUser(userName: string): void {
    localStorage.setItem(this.USER, userName);
  }

  getUser(): string {
    return localStorage.getItem(this.USER) as string;
  }

  clear() {
    localStorage.clear();
  }
}
