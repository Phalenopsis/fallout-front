import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainMenuItem } from '../../core/models/pipboy-menu.model';
import { PipboyLayoutComponent } from '../../core/component/pipboy-layout/pipboy-layout';
// import { CampaignStoreService } from '../services/campaign-store.service';

@Component({
  selector: 'app-campaign-shell',
  standalone: true,
  imports: [PipboyLayoutComponent],
  template: `
    <app-pipboy-layout [menus]="gmMenuConfig" [basePath]="basePath"> </app-pipboy-layout>
  `,
})
export class CampaignShell implements OnInit {
  private route = inject(ActivatedRoute);
  // private campaignStore = inject(CampaignStoreService);

  basePath: string[] = [];

  readonly gmMenuConfig: MainMenuItem[] = [
    {
      label: 'CAMPAGNE',
      path: 'dashboard',
      subMenus: [
        { label: 'JOUEURS', path: 'players' },
        { label: 'RENCONTRES', path: 'encounters' },
      ],
    },
    {
      label: 'ENCYCLOPÉDIE',
      path: 'lore',
      subMenus: [
        { label: 'PNJS', path: 'npcs' },
        { label: 'BESTIAIRE', path: 'beasts' },
        { label: 'LOOT', path: 'loot' },
      ],
    },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.basePath = ['/campaign', id];
      // this.campaignStore.loadCampaign(Number(id));
    }
  }
}
