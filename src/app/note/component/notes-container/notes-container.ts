import { Component, OnInit, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteTreeComponent } from '../note-tree/note-tree';
import { NoteViewer } from '../note-viewer/note-viewer';
import { NoteEditorComponent } from '../note-editor/note-editor';
import { NoteType } from '../../models/note-type.enum';
import { NoteStoreService } from '../../service/note-store.service';
import { CharacterStoreService } from '../../../character/services/character-store.service';
import { CampaignStoreService } from '../../../campaign/services/campaign-store.service';
import { NoteShareTargetDto } from '../../models/note-share-target.dto';
import { ShareTargetType } from '../../models/share-target-type.enum';
import { NoteSummaryDto } from '../../models/note-summary.dto';
import { CreateNoteDto } from '../../models/create-note.dto';
import { UpdateNoteDto } from '../../models/update-note.dto';

type ViewMode = 'VIEW' | 'EDIT' | 'CREATE';

@Component({
  selector: 'app-notes-container',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteTreeComponent, NoteViewer, NoteEditorComponent],
  templateUrl: './note-contenair.html',
  styleUrl: './note-contenair.css',
})
export class NotesContainer implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly noteStore = inject(NoteStoreService);
  private readonly characterStore = inject(CharacterStoreService);
  private readonly campaignStore = inject(CampaignStoreService);

  private readonly ROUTE_MAP: Record<NoteType, string> = {
    [NoteType.QUEST]: 'quests',
    [NoteType.LOCATION]: 'locations',
    [NoteType.NPC]: 'npcs',
    [NoteType.BACKGROUND]: 'background',
    [NoteType.FREE_NOTE]: 'notes',
    [NoteType.MAP]: 'map',
  };

  noteType!: NoteType;
  readonly mode = signal<ViewMode>('VIEW');
  readonly availableShareTargets = signal<NoteShareTargetDto[]>([]);

  formData = {
    title: '',
    content: '',
    directory: '',
    shareTargets: [] as NoteShareTargetDto[],
  };

  constructor() {
    // 💡 Cet effect s'exécute au démarrage ET dès que le character/campaign est chargé (ex: F5)
    effect(() => {
      const char = this.characterStore.character();
      const camp = this.campaignStore.campaign();

      // On s'assure qu'au moins l'un des deux stores est prêt
      if (char || camp) {
        // untracked empêche l'effect d'écouter les modifications qui se passent à l'intérieur
        untracked(() => {
          this.initDataAfterContextReady();
        });
      }
    });
  }

  ngOnInit(): void {
    // 1. Changement de route (ex: passer de Quests à NPCs)
    this.route.data.subscribe((data) => {
      if (data['noteType']) {
        this.noteType = data['noteType'];
        this.mode.set('VIEW');

        const ctx = this.getContext();
        if (ctx.characterId || ctx.campaignId) {
          this.noteStore.loadNotes(ctx, this.noteType);
        }
      }
    });

    // 2. Écoute des queryParams (?noteId=XX)
    this.route.queryParams.subscribe((params) => {
      const noteId = params['noteId'];
      if (noteId) {
        const ctx = this.getContext();
        if (ctx.characterId || ctx.campaignId) {
          this.mode.set('VIEW');
          this.noteStore.loadNoteDetail(ctx, Number(noteId));
        }
      } else {
        // 💡 Si pas de queryParam noteId dans l'URL, on vide la note sélectionnée
        this.noteStore.activeNote.set(null);
      }
    });
  }

  /**
   * Appelé une fois que le Personnage ou la Campagne est disponible en mémoire (post-F5)
   */
  private initDataAfterContextReady(): void {
    const ctx = this.getContext();
    if (!ctx.characterId && !ctx.campaignId) return;

    // 1. Charge la liste de notes du type courant
    if (this.noteType) {
      this.noteStore.loadNotes(ctx, this.noteType);
    }

    // 2. Charge la note demandée si présente dans l'URL
    const noteIdParam = this.route.snapshot.queryParams['noteId'];
    if (noteIdParam) {
      this.mode.set('VIEW');
      this.noteStore.loadNoteDetail(ctx, Number(noteIdParam));
    }

    // 3. Calcul des cibles de partage
    this.computeAvailableShareTargets();
  }

  private getContext(): { characterId?: number; campaignId?: number } {
    const char = this.characterStore.character();
    if (char) return { characterId: char.id };

    const camp = this.campaignStore.campaign();
    if (camp) return { campaignId: camp.id };

    return {};
  }

  onInternalLinkClick(target: { type: NoteType; id: number }): void {
    const routeSegment = this.ROUTE_MAP[target.type];
    if (!routeSegment) return;

    const context = this.getContext();
    const basePath = context.characterId
      ? `/character/${context.characterId}/data/${routeSegment}`
      : `/campaign/${context.campaignId}/data/${routeSegment}`;

    this.router.navigate([basePath], {
      queryParams: { noteId: target.id },
    });
  }

  // --- CALCUL DES CIBLES DE PARTAGE ---
  private computeAvailableShareTargets(): void {
    const char = this.characterStore.character();
    const charCampaign = this.characterStore.characterCampaign();

    if (char && charCampaign) {
      const targets: NoteShareTargetDto[] = [
        {
          type: ShareTargetType.CAMPAIGN,
          id: charCampaign.id,
          name: `Campagne (${charCampaign.name})`,
        },
      ];

      charCampaign.members
        .filter((m) => m.status === 'ACCEPTED' && m.characterId && m.characterId !== char.id)
        .forEach((m) => {
          targets.push({
            type: ShareTargetType.CHARACTER,
            id: m.characterId!,
            name: m.characterName || 'Personnage',
          });
        });

      this.availableShareTargets.set(targets);
      return;
    }

    const activeChars = this.campaignStore.activeCharacters();
    if (activeChars.length > 0) {
      const targets: NoteShareTargetDto[] = activeChars
        .filter((c) => c.characterId !== null)
        .map((c) => ({
          type: ShareTargetType.CHARACTER,
          id: c.characterId!,
          name: c.characterName || 'Personnage',
        }));

      this.availableShareTargets.set(targets);
    }
  }

  // --- AUTRES MÉTHODES (Tree, Edition, Suppr, etc.) ---
  onSelectNoteSummary(summary: NoteSummaryDto): void {
    this.mode.set('VIEW');
    this.noteStore.loadNoteDetail(this.getContext(), summary.id);
  }

  onMoveNote(event: { noteId: number; targetDirectory: string }): void {
    this.noteStore.moveDirectory(this.getContext(), event.noteId, event.targetDirectory);
  }

  openCreationForm(directory = ''): void {
    this.formData = { title: '', content: '', directory, shareTargets: [] };
    this.mode.set('CREATE');
  }

  openEditionForm(): void {
    const active = this.noteStore.activeNote();
    if (!active) return;
    this.formData = {
      title: active.title,
      content: active.content,
      directory: active.directory || '',
      shareTargets: [...(active.sharedWith || [])],
    };
    this.mode.set('EDIT');
  }

  cancelForm(): void {
    this.mode.set('VIEW');
  }

  saveForm(): void {
    const ctx = this.getContext();
    if (this.mode() === 'CREATE') {
      const dto: CreateNoteDto = {
        title: this.formData.title,
        content: this.formData.content,
        type: this.noteType,
        campaignId: ctx.campaignId ?? null,
        characterId: ctx.characterId ?? null,
        shareTargets: this.formData.shareTargets,
        directory: this.formData.directory,
      };
      this.noteStore.createNote(ctx, dto, () => this.mode.set('VIEW'));
    } else if (this.mode() === 'EDIT') {
      const active = this.noteStore.activeNote();
      if (!active) return;
      const dto: UpdateNoteDto = {
        title: this.formData.title,
        content: this.formData.content,
        type: this.noteType,
        shareTargets: this.formData.shareTargets,
        directory: this.formData.directory,
      };
      this.noteStore.updateNote(ctx, active.id, dto, () => this.mode.set('VIEW'));
    }
  }

  onCopyNote(noteId: number): void {
    this.noteStore.copyNote(this.getContext(), noteId);
  }

  onDeleteNote(noteId: number, type: NoteType): void {
    this.noteStore.deleteNote(this.getContext(), noteId, type, () => this.mode.set('VIEW'));
  }

  isTargetSelected(target: NoteShareTargetDto): boolean {
    return this.formData.shareTargets.some((t) => t.type === target.type && t.id === target.id);
  }

  toggleShareTarget(target: NoteShareTargetDto): void {
    if (this.isTargetSelected(target)) {
      this.formData.shareTargets = this.formData.shareTargets.filter(
        (t) => !(t.type === target.type && t.id === target.id),
      );
    } else {
      this.formData.shareTargets.push(target);
    }
  }
}
