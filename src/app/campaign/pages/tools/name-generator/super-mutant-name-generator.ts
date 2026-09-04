import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NameGeneratorService } from '../../../../service/api/name-generator.service';
import { NoteStoreService } from '../../../../note/service/note-store.service';
import { CampaignStoreService } from '../../../services/campaign-store.service';
import { NoteType } from '../../../../note/models/note-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'super-mutant-name-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './super-mutant-name-generator.html',
  styleUrl: './../../../../core/component/pipboy-layout/pipboy-page.css',
})
export class SuperMutantNameGenerator {
  private nameService = inject(NameGeneratorService);
  private noteService = inject(NoteStoreService);
  private campaignStore = inject(CampaignStoreService);
  private readonly router = inject(Router);

  // Signal pour stocker la liste générée
  names = signal<string[]>([]);

  generate() {
    this.nameService.generateSuperMutantNames(5).subscribe((list) => this.names.set(list));
  }

  selectName(selectedName: string) {
    // Émet l'événement pour pré-remplir et ouvrir ton composant Note
    const campaignId = this.campaignStore.campaign()?.id;
    this.noteService.createNote(
      { campaignId: campaignId },
      {
        title: selectedName,
        content: selectedName,
        type: NoteType.NPC,
        campaignId: this.campaignStore.campaign()?.id ?? null,
        characterId: null,
        shareTargets: [],
        directory: '',
      },
      (note) => {
        const basePath = `/campaign/${campaignId}/data/npcs`;
        this.router.navigate([basePath]);
        console.log(selectedName);
      },
    );
  }
}
