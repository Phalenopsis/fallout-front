import { Component } from '@angular/core';
import { BaseTerminal } from './_base-terminal.abstract';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-terminal-login',
    templateUrl: './base-terminal.component.html', // réutilise le template commun
    styleUrls: ['./base-terminal.component.css']   // réutilise le CSS commun
})
export class LoginTerminalComponent extends BaseTerminal {

    private step: 'login' | 'password' = 'login';
    private username = "";
    private passwordBuffer = "";

    protected initTerminal(): void {
        this.pushLine("| WELCOME TO SECURE TERMINAL");
        this.pushLine("| PLEASE ENTER YOUR LOGIN:");
        this.promptLabel.set("ENTER LOGIN: ");
    }

    protected async onEnter(text: string): Promise<void> {
        if (this.step === 'login') {
            this.username = text;
            this.step = 'password';
            this.promptLabel.set("ENTER PASSWORD: ");
            this.pushLine(`| Attempt to Log as : ${this.username}`);
            return;
        }

        if (this.step === 'password') {
            this.passwordBuffer = text;
            this.pushLine(`| Attempt to log as user '${this.username}...'`);
            this.inputLocked.set(true);

            try {
                await this.auth.login(this.username, this.passwordBuffer);

                this.pushLine("> ACCESS GRANTED");
                this.pushLine("> LOADING SYSTEM...");

                setTimeout(() => {
                    this.router.navigate(['/terminal/profil']);
                }, 1200);

            } catch (e) {
                this.pushLine("> INCORRECT PASSWORD. TRY AGAIN.");
                setTimeout(() => {
                    this.inputLocked.set(false);
                    this.promptLabel.set("ENTER PASSWORD: ");
                }, 600);
            }
        }
    }

    constructor(
        private auth: AuthService,
        private router: Router
    ) {
        super();
    }
}
