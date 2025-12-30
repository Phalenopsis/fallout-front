import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTerminal } from './_base-terminal.abstract';
import { ChoiceService } from './service/choice-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewOption } from './model/view-option';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choice-terminal',
  standalone: true,
  templateUrl: './base-terminal.component.html',
  styleUrls: ['./base-terminal.component.css'],
})
export abstract class OptionTerminal extends BaseTerminal {
  protected abstract choiceService: ChoiceService;
  private destroyRef = inject(DestroyRef);

  constructor(protected router: Router) {
    super();
  }

  protected override initTerminal(): void {
    this.pushLine('| WELCOME TO SECURE TERMINAL');
    this.pushLine('| PLEASE ENTER YOUR CHOICE:');

    const obs$ = this.choices$;
    if (obs$) {
      obs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((choices) => {
        this.choices.set(choices);
      });
    }

    this.promptLabel.set('ENTER CHOICE: ');
  }

  protected override onEnter(value: string): void {
    this.inputLocked.set(true);
    this.pushLine(`| Attempt to choose option ${value}...`);
    this.pushLine('| VERIFYING...');

    try {
      const link = this.verifyChoice(value);
      this.pushLine('> ACCESS GRANTED');
      this.pushLine('> LOADING SYSTEM...');
      this.router.navigate([link]);
    } catch {
      this.pushLine('> INCORRECT CHOICE. TRY AGAIN.');
      this.inputLocked.set(false);
    }
  }

  protected verifyChoice(choice: string): string {
    const found = this.choices().find((c) => c.key === choice);
    if (!found) throw new Error('Bad Request');
    if (!found.link) throw new Error('Not implemented');
    return found.link;
  }

  protected override get choices$(): Observable<ViewOption[]> {
    return this.choiceService.getPossiblesChoice$();
  }
}
