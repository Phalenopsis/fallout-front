import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HomeChoiceService } from './service/home-choice-service';
import { OptionTerminal } from './_option-terminal.abstract';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../service/auth-service';
import { CampaignStoreService } from '../campaign/services/campaign-store.service';
import { CharacterStoreService } from '../character/services/character-store.service';

@Component({
  selector: 'app-terminal-home',
  standalone: true,
  templateUrl: './base-terminal.component.html', // réutilise le template commun
  styleUrls: ['./base-terminal.component.css'], // réutilise le CSS commun
})
export class HomeTerminal extends OptionTerminal {
  choiceService: HomeChoiceService = inject(HomeChoiceService);
  authService: AuthService = inject(AuthService);
  campaignStore: CampaignStoreService = inject(CampaignStoreService);
  characterStore: CharacterStoreService = inject(CharacterStoreService);

  constructor(protected override router: Router) {
    super(router);
  }

  ngOnInit(): void {
    this.authService.user$().subscribe((user) => {
      if (user) {
        this.router.navigate(['/terminal/profil']);
      }
    });
    this.campaignStore.clear();
    this.characterStore.clear();
  }
}
