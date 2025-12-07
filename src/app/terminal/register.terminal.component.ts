import { Component } from "@angular/core";
import { BaseTerminal } from "./_base-terminal.abstract";
import { AuthService } from "../service/auth-service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-terminal-register',
    standalone: true,
    templateUrl: './base-terminal.component.html', // réutilise le template commun
    styleUrls: ['./base-terminal.component.css']   // réutilise le CSS commun
})
export class RegisterTerminalComponent extends BaseTerminal {

    private step: 'register' | 'password' = 'register';
    private username = "";
    private passwordBuffer = "";

    protected initTerminal(): void {
        this.pushLine("| WELCOME TO SECURE TERMINAL");
        this.pushLine("| PLEASE ENTER YOUR USERNAME:");
        this.promptLabel.set("ENTER USERNAME: ");
    }

    protected async onEnter(text: string): Promise<void> {
        if (this.step === 'register') {
            this.username = text;
            this.step = 'password';
            this.promptLabel.set("ENTER PASSWORD: ");
            this.pushLine(`| Attempt to create as : ${this.username}`);
            return;
        }

        if (this.step === 'password') {
            this.passwordBuffer = text;
            this.pushLine(`| Attempt to log as user '${this.username}...'`);
            this.inputLocked.set(true);

            try {
                await this.auth.register(this.username, this.passwordBuffer);

                this.pushLine("> ACCESS CREATED");
                this.pushLine("> LOADING SYSTEM...");

                setTimeout(() => {
                    this.router.navigate(['/terminal']);
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
