import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-base-terminal', // ne sera jamais utilisé directement
  templateUrl: './base-terminal.component.html',
})
export abstract class BaseTerminal implements AfterViewInit, AfterViewChecked {

  @ViewChild('cmdInput') cmdInput!: ElementRef<HTMLInputElement>;

  /** Texte en cours de saisie */
  inputText = signal("");

  /** Lignes du terminal */
  lines = signal<string[]>([]);

  /** Blocage du clavier */
  inputLocked = signal(false);

  /** Label du prompt, ex : ENTER LOGIN: ou ENTER CHOICE: */
  promptLabel = signal("");

  ngAfterViewInit() {
    this.initTerminal();
  }

  ngAfterViewChecked() {
    this.focusInputIfAvailable();
  }

  private focusInputIfAvailable() {
    if (!this.inputLocked() && this.cmdInput) {
      setTimeout(() => this.cmdInput.nativeElement.focus());
    }
  }

  /** Méthode abstraite que chaque terminal concret doit implémenter */
  protected abstract initTerminal(): void;

  /** Méthode appelée quand l’utilisateur valide le champ (ENTER) */
  protected abstract onEnter(value: string): void;

  /** Ajout d’une ligne dans le terminal */
  protected pushLine(text: string) {
    this.lines.update(arr => [...arr, text]);
  }

  /** Gestion de la saisie */
  onInput(event: Event) {
    if (this.inputLocked()) return;
    this.inputText.set((event.target as HTMLInputElement).value);
  }

  /** Gestion de la touche Enter */
  onKey(event: KeyboardEvent) {
    if (this.inputLocked()) return;
    if (event.key === "Enter") {
      const val = this.inputText();
      this.inputText.set(""); // reset champ
      this.onEnter(val);
    }
  }

  protected unlockInput() {
    this.inputLocked.set(false);

    // Petite sécurité pour focus après changement de signal
    setTimeout(() => {
      this.cmdInput.nativeElement.focus();
    });
  }
}
