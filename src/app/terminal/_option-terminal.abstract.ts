import { Component, DestroyRef, inject, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTerminal } from './_base-terminal.abstract';
import { ChoiceService } from './service/choice-service';
import { firstValueFrom, Observable } from 'rxjs';
import { ViewOption } from './model/view-option';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-choice-terminal',
    standalone: true,
    templateUrl: './base-terminal.component.html',
    styleUrls: ['./base-terminal.component.css'],
})
export abstract class OptionTerminal extends BaseTerminal {


    protected abstract choiceService: ChoiceService;

    protected override get choices$(): Observable<ViewOption[]> {
        return this.choiceService.getPossiblesChoice$();
    }

    /** Options possibles affichées dans le terminal */

    private destroyRef = inject(DestroyRef);

    constructor(
        protected router: Router,
    ) {
        super();
    }

    /** Initialisation spécifique aux ChoiceTerminals */
    protected initTerminal(): void {
        this.pushLine("| WELCOME TO SECURE TERMINAL");
        this.pushLine("| PLEASE ENTER YOUR CHOICE:");

        this.choices$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(choices => {
                this.choices.set(choices);
            });

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
        const found = this.choices().find(c => c.key === choice);
        if (!found) throw new Error("Bad Request");
        if (!found.link) throw new Error("Not implemented");
        return found.link;
    }
}
