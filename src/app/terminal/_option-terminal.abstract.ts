import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTerminal } from './_base-terminal.abstract';
import { ChoiceService } from './service/choice-service';

@Component({
    selector: 'app-choice-terminal', // jamais utilisé directement
    templateUrl: './base-terminal.component.html', // réutilise le template commun
    styleUrls: ['./base-terminal.component.css']
})
export abstract class OptionTerminal extends BaseTerminal {

    /** Options possibles */
    possibleChoices: string[] = [];

    constructor(
        protected router: Router,
        protected choiceService: ChoiceService
    ) {
        super();
    }

    /** Initialisation spécifique aux ChoiceTerminals */
    protected initTerminal(): void {
        this.pushLine("| WELCOME TO SECURE TERMINAL");
        this.pushLine("| PLEASE ENTER YOUR CHOICE:");

        this.possibleChoices = this.choiceService.getPossiblesChoice().map(c => `${c.key} : ${c.value}`);
        for (const line of this.possibleChoices) {
            this.pushLine(line);
        }

        this.promptLabel.set("ENTER CHOICE: ");
    }

    protected onEnter(value: string): void {
        this.inputLocked.set(true);
        this.pushLine(`| Attempt to choose option ${value}...`);
        this.pushLine("| VERIFYING...");

        try {
            const link = this.verifyChoice(value);
            this.pushLine("> ACCESS GRANTED");
            this.pushLine("> LOADING SYSTEM...");

            setTimeout(() => this.router.navigate([link]), 1200);
        } catch (err) {
            this.pushLine("> INCORRECT CHOICE. TRY AGAIN.");
            setTimeout(() => this.unlockInput(), 600);
        }
    }

    protected verifyChoice(choice: string): string {
        const found = this.choiceService.getPossiblesChoice().find(c => c.key === choice);
        if (!found) throw new Error("Bad Request");
        if (!found.link) throw new Error("Not implemented");
        return found.link;
    }
}
