import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectoryNode } from '../../service/directory-tree.helper';
import { NoteSummaryDto } from '../../models/note-summary.dto';

@Component({
  selector: 'app-note-tree',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'note-tree.html',
  styleUrl: 'note-tree.css',
})
export class NoteTreeComponent {
  @Input({ required: true }) tree!: DirectoryNode;
  @Input() selectedNoteId: number | null = null;

  @Output() noteSelect = new EventEmitter<NoteSummaryDto>();
  @Output() createNote = new EventEmitter<string>(); // Émet le directory cible
  @Output() moveNote = new EventEmitter<{ noteId: number; targetDirectory: string }>();

  // État local des dossiers ouverts (par leur fullPath)
  readonly openFolders = signal<Set<string>>(new Set(['shared']));
  readonly showNewFolderInput = signal<boolean>(false);
  readonly dragOverPath = signal<string | null>(null);
  readonly customFolders = signal<Set<string>>(new Set());

  newFolderName = '';

  toggleFolder(fullPath: string): void {
    this.openFolders.update((set) => {
      const next = new Set(set);
      if (next.has(fullPath)) {
        next.delete(fullPath);
      } else {
        next.add(fullPath);
      }
      return next;
    });
  }

  isFolderOpen(fullPath: string): boolean {
    return this.openFolders().has(fullPath);
  }

  toggleNewFolderInput(): void {
    this.showNewFolderInput.update((v) => !v);
    this.newFolderName = '';
  }

  createFolder(basePath: string): void {
    const name = this.newFolderName.trim();
    if (!name) return;

    const fullPath = basePath ? `${basePath}/${name}` : name;

    // Ouvre automatiquement le dossier créé
    this.openFolders.update((set) => new Set(set).add(fullPath));

    this.customFolders.update((set) => new Set(set).add(fullPath));

    // Déclenche la création d'une nouvelle note dans ce nouveau répertoire
    this.createNote.emit(fullPath);

    this.showNewFolderInput.set(false);
    this.newFolderName = '';
  }

  onCreateNoteInFolder(directoryPath: string): void {
    this.createNote.emit(directoryPath);
  }

  onSelectNote(note: NoteSummaryDto): void {
    this.noteSelect.emit(note);
  }

  // --- DRAG & DROP ---

  onDragStart(event: DragEvent, note: NoteSummaryDto): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', String(note.id));
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent, folderPath: string): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    this.dragOverPath.set(folderPath);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOverPath.set(null);
  }

  onDrop(event: DragEvent, targetDirectory: string): void {
    event.preventDefault();
    this.dragOverPath.set(null);

    if (event.dataTransfer) {
      const noteIdStr = event.dataTransfer.getData('text/plain');
      const noteId = Number(noteIdStr);

      if (noteId) {
        this.moveNote.emit({ noteId, targetDirectory });
      }
    }
  }
}
