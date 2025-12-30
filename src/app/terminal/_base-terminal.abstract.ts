import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ViewOption } from './model/view-option';

@Component({
  selector: 'app-base-terminal', // ne sera jamais utilisé directement
  standalone: true,
  templateUrl: './base-terminal.component.html',
})
export abstract class BaseTerminal implements AfterViewInit, AfterViewChecked {
  @ViewChild('inputBar') inputEl!: ElementRef<HTMLInputElement>;

  // Signals correctement initialisés dans le contexte de la classe
  inputValue = signal('');
  lines = signal<string[]>([]);
  promptLabel = signal('');
  inputLocked = signal(false);
  choices = signal<ViewOption[]>([]);

  ngAfterViewInit(): void {
    this.initTerminal();
  }

  ngAfterViewChecked(): void {
    // autofocus seulement si input unlocked et présent
    if (!this.inputLocked() && this.inputEl) {
      this.inputEl.nativeElement.focus({ preventScroll: true });
    }
  }

  /** Méthodes abstraites à implémenter dans chaque terminal concret */
  protected abstract initTerminal(): void;
  protected abstract onEnter(value: string): void;

  /** Soumission de l’input */
  submit() {
    if (this.inputLocked()) return;

    const value = this.inputValue().trim();
    this.inputValue.set('');
    this.onEnter(value);
  }

  /** Ajouter une ligne dans le terminal */
  protected pushLine(text: string) {
    this.lines.update((arr) => [...arr, text]);
  }

  /** Observable pour les choix (optionnel) */
  protected get choices$(): Observable<ViewOption[]> | null {
    return null;
  }
}
