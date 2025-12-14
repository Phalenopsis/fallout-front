import { Component, inject } from "@angular/core";
import { BaseTerminal } from "../_base-terminal.abstract";
import { Router } from "@angular/router";
import { CharacterCreationService } from "./character-creation.service";

@Component({
    selector: 'app-terminal-creation-name',
    standalone: true,
    templateUrl: '../base-terminal.component.html', // réutilise le template commun
    styleUrls: ['../base-terminal.component.css']   // réutilise le CSS commun
})
export class CharacterNameCreationTerminalComponent extends BaseTerminal {
    private characterName = "";
    characterCreationService: CharacterCreationService = inject(CharacterCreationService);

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
            const route: string = `/terminal/creation/${this.characterCreationService.getNextStep()}`;
            this.characterCreationService.character.name = this.characterName;
            this.characterCreationService.goToNextStep();

            this.router.navigate([route]);
        }, 600);
    }

    constructor(
        private router: Router
    ) {
        super();
    }
}