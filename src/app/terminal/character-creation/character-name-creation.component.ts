import { Component } from "@angular/core";
import { BaseTerminal } from "../_base-terminal.abstract";
import { Router } from "@angular/router";

@Component({
    selector: 'app-terminal-register',
    standalone: true,
    templateUrl: '../base-terminal.component.html', // réutilise le template commun
    styleUrls: ['../base-terminal.component.css']   // réutilise le CSS commun
})
export class CharacterNameCreationTerminalComponent extends BaseTerminal {
    private characterName = "";

    protected initTerminal(): void {
        this.pushLine("| WELCOME TO SECURE TERMINAL");
        this.pushLine("| CHARACTER CREATION")
        this.pushLine("| PLEASE ENTER YOUR CHARACTER NAME:");
        this.promptLabel.set("ENTER CHARACTERNAME: ");
    }

    protected async onEnter(text: string): Promise<void> {
        this.characterName = text;
        this.pushLine(`> INITIALIZING CHARACTER ${this.characterName}`);
        this.pushLine("> LOADING SYSTEM...");
        this.inputLocked.set(true);

        setTimeout(() => {
            this.router.navigate(['/terminal/creating-special']);
        }, 600);
    }

    constructor(
        private router: Router
    ) {
        super();
    }
}