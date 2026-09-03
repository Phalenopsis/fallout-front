import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OptionTerminal } from './_option-terminal.abstract';
import { ProfilChoiceService } from '../service/profil-choice-service';
import { CharacterCreationService } from './character-creation/character-creation.service';
import { CharacterStoreService } from '../character/services/character-store.service';
import { CampaignStoreService } from '../campaign/services/campaign-store.service';

@Component({
  selector: 'app-terminal-profil',
  standalone: true,
  templateUrl: './base-terminal.component.html', // réutilise le template commun
  styleUrls: ['./base-terminal.component.css'], // réutilise le CSS commun,
})
export class ProfilTerminal extends OptionTerminal {
  choiceService: ProfilChoiceService = inject(ProfilChoiceService);
  characterCreationService: CharacterCreationService = inject(CharacterCreationService);
  campaignStore: CampaignStoreService = inject(CampaignStoreService);
  characterStore: CharacterStoreService = inject(CharacterStoreService);

  constructor(protected override router: Router) {
    super(router);
    this.characterCreationService.reset();
    this.campaignStore.clear();
    this.characterStore.clear();
  }
}
