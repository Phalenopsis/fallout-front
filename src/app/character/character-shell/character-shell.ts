import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainMenuItem } from '../../core/models/pipboy-menu.model';
import { CharacterStoreService } from '../services/character-store.service';
import { PipboyLayoutComponent } from '../../core/component/pipboy-layout/pipboy-layout';

@Component({
  selector: 'app-character-shell',
  standalone: true,
  imports: [PipboyLayoutComponent], // On importe le nouveau composant
  template: ` <app-pipboy-layout [menus]="menuConfig" [basePath]="basePath"> </app-pipboy-layout> `,
  // Plus besoin de fichier CSS, tout est géré par l'enfant !
})
export class CharacterShell implements OnInit {
  private route = inject(ActivatedRoute);
  private characterStore = inject(CharacterStoreService);

  basePath: string[] = [];

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
        { label: 'LIEUX', path: 'locations' },
        { label: 'PERSONNAGES', path: 'npcs' },
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

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.characterStore.loadCharacter(id);
    }
  }
}
