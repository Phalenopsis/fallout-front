import { Injectable, computed, inject, signal } from '@angular/core';
import { NoteApiService } from '../../service/api/note-api.service';
import { NoteType } from '../models/note-type.enum';
import { NoteSummaryDto } from '../models/note-summary.dto';
import { NoteResponseDto } from '../models/note-response.dto';
import { buildDirectoryTree } from './directory-tree.helper';
import { CreateNoteDto } from '../models/create-note.dto';
import { UpdateNoteDto } from '../models/update-note.dto';

@Injectable({
  providedIn: 'root',
})
export class NoteStoreService {
  private readonly api = inject(NoteApiService);

  // --- ÉTATS SIGNALS ---
  readonly activeType = signal<NoteType | null>(null);

  // Stocke TOUTES les notes (tous types confondus) pour le contexte courant
  readonly allSummaries = signal<NoteSummaryDto[]>([]);

  readonly activeNote = signal<NoteResponseDto | null>(null);

  readonly isLoadingList = signal<boolean>(false);
  readonly isLoadingDetail = signal<boolean>(false);

  // --- COMPUTED SIGNALS ---

  // Filtre automatique des notes selon le type actif (pour l'arbre)
  readonly currentSummaries = computed(() => {
    const type = this.activeType();
    if (!type) return [];
    return this.allSummaries().filter((note) => note.type === type);
  });

  // Arbre des dossiers construit à partir du type sélectionné
  readonly currentDirectoryTree = computed(() => {
    return buildDirectoryTree(this.currentSummaries());
  });

  // --- ACTIONS DE CHARGEMENT ---

  /**
   * Modifie le type actif et charge TOUTES les notes si la liste est vide.
   */
  loadNotes(context: { characterId?: number; campaignId?: number }, type: NoteType): void {
    this.activeType.set(type);

    // Si les notes sont déjà chargées en mémoire, pas besoin de réinterroger l'API
    if (this.allSummaries().length > 0) {
      return;
    }

    this.fetchAllNotes(context);
  }

  /**
   * Récupère la liste complète de toutes les notes du contexte.
   */
  fetchAllNotes(context: { characterId?: number; campaignId?: number }): void {
    this.isLoadingList.set(true);

    const request$ = context.characterId
      ? this.api.completeListForCharacter(context.characterId)
      : context.campaignId
        ? this.api.completeListForCampaign(context.campaignId)
        : null;

    if (!request$) {
      this.isLoadingList.set(false);
      return;
    }

    request$.subscribe({
      next: (summaries) => {
        this.allSummaries.set(summaries);
        this.isLoadingList.set(false);
      },
      error: () => this.isLoadingList.set(false),
    });
  }

  /**
   * Charge le détail d'une note et marque son statut à "read = true" localement.
   */
  loadNoteDetail(context: { characterId?: number; campaignId?: number }, noteId: number): void {
    // Empêche de Re-charger la note si c'est déjà la note active
    if (this.activeNote()?.id === noteId && !this.isLoadingDetail()) {
      return;
    }

    this.isLoadingDetail.set(true);

    const request$ = context.characterId
      ? this.api.getForCharacter(context.characterId, noteId)
      : context.campaignId
        ? this.api.getForCampaign(context.campaignId, noteId)
        : null;

    if (!request$) {
      this.isLoadingDetail.set(false);
      return;
    }

    request$.subscribe({
      next: (note) => {
        this.activeNote.set(note);
        this.isLoadingDetail.set(false);

        // Met à jour la liste SEULEMENT si la note n'était pas encore marquée comme lue
        this.allSummaries.update((list) => {
          const item = list.find((n) => n.id === noteId);
          if (item && !item.read) {
            return list.map((n) => (n.id === noteId ? { ...n, read: true } : n));
          }
          return list; // Si déjà read, on renvoie la même instance (pas d'émissions Signal superflues)
        });
      },
      error: () => this.isLoadingDetail.set(false),
    });
  }

  // --- ACTIONS DE MUTATION (CRÉATION / MODIFICATION / SUPPRESSION) ---

  createNote(
    context: { characterId?: number; campaignId?: number },
    dto: CreateNoteDto,
    onSuccess?: (note: NoteResponseDto) => void,
  ): void {
    const request$ = context.characterId
      ? this.api.createForCharacter(context.characterId, dto)
      : context.campaignId
        ? this.api.createForCampaign(context.campaignId, dto)
        : null;

    if (!request$) return;

    request$.subscribe((newNote) => {
      this.activeNote.set(newNote);
      this.fetchAllNotes(context); // Rafraîchit la liste complète
      if (onSuccess) onSuccess(newNote);
    });
  }

  updateNote(
    context: { characterId?: number; campaignId?: number },
    noteId: number,
    dto: UpdateNoteDto,
    onSuccess?: (note: NoteResponseDto) => void,
  ): void {
    const request$ = context.characterId
      ? this.api.updateForCharacter(context.characterId, noteId, dto)
      : context.campaignId
        ? this.api.updateForCampaign(context.campaignId, noteId, dto)
        : null;

    if (!request$) return;

    request$.subscribe((updatedNote) => {
      this.activeNote.set(updatedNote);
      this.fetchAllNotes(context);
      if (onSuccess) onSuccess(updatedNote);
    });
  }

  moveDirectory(
    context: { characterId?: number; campaignId?: number },
    noteId: number,
    targetDirectory: string,
  ): void {
    const request$ = context.characterId
      ? this.api.updateDirectoryForCharacter(context.characterId, noteId, targetDirectory)
      : context.campaignId
        ? this.api.updateDirectoryForCampaign(context.campaignId, noteId, targetDirectory)
        : null;

    if (!request$) return;

    request$.subscribe((updatedNote) => {
      this.activeNote.set(updatedNote);
      this.fetchAllNotes(context);
    });
  }

  copyNote(
    context: { characterId?: number; campaignId?: number },
    noteId: number,
    onSuccess?: (copiedNote: NoteResponseDto) => void,
  ): void {
    const request$ = context.characterId
      ? this.api.copyToCharacter(context.characterId, noteId)
      : context.campaignId
        ? this.api.copyToCampaign(context.campaignId, noteId)
        : null;

    if (!request$) return;

    request$.subscribe((copiedNote) => {
      this.fetchAllNotes(context);
      if (onSuccess) onSuccess(copiedNote);
    });
  }

  deleteNote(
    context: { characterId?: number; campaignId?: number },
    noteId: number,
    type: NoteType,
    onSuccess?: () => void,
  ): void {
    const request$ = context.characterId
      ? this.api.deleteForCharacter(context.characterId, noteId)
      : context.campaignId
        ? this.api.deleteForCampaign(context.campaignId, noteId)
        : null;

    if (!request$) return;

    request$.subscribe(() => {
      if (this.activeNote()?.id === noteId) {
        this.activeNote.set(null);
      }
      this.fetchAllNotes(context);
      if (onSuccess) onSuccess();
    });
  }

  clearActiveNote(): void {
    this.activeNote.set(null);
  }
}
