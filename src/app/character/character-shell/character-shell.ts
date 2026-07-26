import { Component, inject } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
} from '@angular/router';
import { MainMenuItem } from '../models/pipboy-menu.model';
import { CharacterApiService } from '../../service/api/character-api.service';

@Component({
  selector: 'app-character-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './character-shell.html',
  styleUrls: ['./character-shell.css'],
})
export class CharacterShell {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private characterApiService = inject(CharacterApiService);

  // L'ID est extrait du paramètre de la route courante
  id = Number(this.route.snapshot.paramMap.get('id'));
  character = this.characterApiService.getCharacter(this.id);

  readonly menuConfig: MainMenuItem[] = [
    {
      label: 'STATS',
      path: 'stats',
      subMenus: [
        { label: 'STATUS', path: 'status' },
        { label: 'SPECIAL', path: 'special' },
        { label: 'COMPÉTENCES', path: 'skills' },
        { label: 'APTITUDES / TRAITS', path: 'perks' },
      ],
    },
    {
      label: 'DONNÉES',
      path: 'data',
      subMenus: [
        { label: 'QUÊTES', path: 'quests' },
        { label: 'RÉPUTATION', path: 'reputation' },
        { label: 'BACKGROUND', path: 'background' },
        { label: 'NOTES', path: 'notes' },
      ],
    },
    {
      label: 'INVENTAIRE',
      path: 'inventory',
      subMenus: [
        { label: 'ARMES', path: 'weapons' },
        { label: 'ARMURES', path: 'armor' },
        { label: 'DIVERS', path: 'misc' },
      ],
    },
    {
      label: 'RÉGLAGES',
      path: 'settings',
      subMenus: [],
    },
  ];

  // Identifie la section principale active (stats, data, inventory, settings)
  get activeMainMenu(): MainMenuItem | undefined {
    const urlSegments = this.router.url.split('/');
    // L'URL ressemble à /character/123/stats/special -> index 3 = 'stats'
    const currentSection = urlSegments[3] || 'stats';
    return this.menuConfig.find((m) => m.path === currentSection);
  }
}
