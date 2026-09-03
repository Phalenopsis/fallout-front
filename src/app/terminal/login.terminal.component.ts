import { Component, DestroyRef, inject } from '@angular/core';
import { BaseTerminal } from './_base-terminal.abstract';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-terminal-login',
  standalone: true,
  templateUrl: './base-terminal.component.html', // réutilise le template commun
  styleUrls: ['./base-terminal.component.css'], // réutilise le CSS commun
})
export class LoginTerminalComponent extends BaseTerminal {
  private step: 'login' | 'password' = 'login';
  private username = '';
  private passwordBuffer = '';
  private destroyRef = inject(DestroyRef);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    super();
  }

  protected initTerminal(): void {
    this.pushLine('| WELCOME TO SECURE TERMINAL');
    this.pushLine('| PLEASE ENTER YOUR LOGIN:');
    this.promptLabel.set('ENTER LOGIN: ');
  }

  protected onEnter(text: string): void {
    if (this.step === 'login') {
      this.username = text;
      this.step = 'password';
      this.promptLabel.set('ENTER PASSWORD: ');
      this.pushLine(`| Attempt to Log as : ${this.username}`);
      return;
    }

    if (this.step === 'password') {
      this.passwordBuffer = text;
      this.pushLine(`| Attempt to log as user '${this.username}...'`);
      this.inputLocked.set(true);

      this.auth
        .login(this.username, this.passwordBuffer)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((err: HttpErrorResponse) => {
            this.handleLoginError(err);
            return EMPTY;
          }),
        )
        .subscribe(() => {
          this.pushLine('> ACCESS GRANTED');
          this.pushLine('> LOADING SYSTEM...');

          this.router.navigate(['/terminal/profil']);
        });
    }
  }

  private handleLoginError(err: HttpErrorResponse) {
    this.pushLine('> INCORRECT PASSWORD. TRY AGAIN.');
    this.passwordBuffer = '';

    this.inputLocked.set(false);
    this.promptLabel.set('ENTER PASSWORD: ');
  }
}
