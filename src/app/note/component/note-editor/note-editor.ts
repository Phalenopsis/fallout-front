import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteSummaryDto } from '../../models/note-summary.dto';
import { NoteStoreService } from '../../service/note-store.service';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-editor.html',
  styleUrls: ['./note-editor.css'],
})
export class NoteEditorComponent {
  @Input() content = '';
  @Input() availableNotes: NoteSummaryDto[] = [];
  @Output() contentChange = new EventEmitter<string>();

  @ViewChild('editorTextarea') textareaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('editorContainer') containerRef!: ElementRef<HTMLDivElement>;

  // Signals
  showAutocomplete = signal(false);
  searchTerm = signal('');
  selectedIndex = signal(0);
  popupPosition = signal<{ top: number; left: number }>({ top: 0, left: 0 });

  // Calcul des notes filtrées selon ce qu'on retape après le '@'
  filteredNotes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.availableNotes.filter((n) => n.title.toLowerCase().includes(term));
  });

  noteService: NoteStoreService = inject(NoteStoreService);

  onInput(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.content = val;
    this.contentChange.emit(val);
    this.checkAutocompleteTrigger();
  }

  checkAutocompleteTrigger(): void {
    const textarea = this.textareaRef?.nativeElement;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);

    // Extrait le dernier mot saisi précédé d'un @
    const match = textBeforeCursor.match(/@([\w-]*)$/);

    if (match) {
      this.searchTerm.set(match[1]);
      this.showAutocomplete.set(true);
      this.calculatePopupPosition(textarea);
    } else {
      this.showAutocomplete.set(false);
    }
  }

  private calculatePopupPosition(textarea: HTMLTextAreaElement): void {
    // Sur mobile, si l'espace sous le curseur est restreint par le clavier,
    // on force l'affichage du popup en haut du conteneur.
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      this.popupPosition.set({ top: 35, left: 10 });
      // Assure que le textarea reste visible dans le viewport tactile
      textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Positionnement standard Desktop (en dessous du champ)
      this.popupPosition.set({ top: 40, left: 15 });
    }
  }

  selectNoteLink(note: NoteSummaryDto): void {
    const textarea = this.textareaRef.nativeElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const textAfterCursor = textarea.value.substring(cursorPosition);

    // Remplace la requête @chose par le format de lien Pip-Boy, ex: [[note-id|Titre]]
    const newTextBefore = textBeforeCursor.replace(
      /@[\w-]*$/,
      `[[${note.type}:${note.id}|${note.title}]] `,
    );

    this.content = newTextBefore + textAfterCursor;
    this.contentChange.emit(this.content);
    this.showAutocomplete.set(false);

    // Repositionne le curseur
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newTextBefore.length, newTextBefore.length);
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.showAutocomplete()) return;

    const notes = this.filteredNotes();
    if (notes.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.update((i) => (i + 1) % notes.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.update((i) => (i - 1 + notes.length) % notes.length);
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.selectNoteLink(notes[this.selectedIndex()]);
    } else if (event.key === 'Escape') {
      this.showAutocomplete.set(false);
    }
  }
}
