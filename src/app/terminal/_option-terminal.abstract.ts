import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTerminal } from './_base-terminal.abstract';
import { ChoiceService } from './service/choice-service';
import { firstValueFrom } from 'rxjs';
import { ViewOption } from './model/view-option';

@Component({
    selector: 'app-choice-terminal',
    standalone: true,
    templateUrl: './base-terminal.component.html',
    styleUrls: ['./base-terminal.component.css']
})
export abstract class OptionTerminal extends BaseTerminal {

    /** Options possibles affichées dans le terminal */
    possibleChoices: string[] = [];
    private rawChoices: ViewOption[] = [];

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

        // On s'abonne à l'Observable au lieu d'attendre
        this.choiceService.getPossiblesChoice$().subscribe(choices => {
            this.rawChoices = choices;
            this.possibleChoices = choices.map(c => `${c.key} : ${c.value}`);
            this.possibleChoices.forEach(line => this.pushLine(line));
        });

        this.promptLabel.set("ENTER CHOICE: ");
    }
    protected async onEnter(value: string): Promise<void> {
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
        const found = this.rawChoices.find(c => c.key === choice);
        if (!found) throw new Error("Bad Request");
        if (!found.link) throw new Error("Not implemented");
        return found.link;
    }
}
