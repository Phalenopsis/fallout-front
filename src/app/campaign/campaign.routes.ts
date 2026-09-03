import { Routes } from '@angular/router';
import { CampaignShell } from './campaign-shell/campaign-shell';

export const CAMPAIGN_ROUTES: Routes = [
  {
    path: '',
    component: CampaignShell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        children: [
          { path: '', redirectTo: 'players', pathMatch: 'full' },
          {
            path: 'players',
            loadComponent: () => import('./pages/dashboard/players/players').then((m) => m.Players),
          },
          {
            path: 'encounters',
            loadComponent: () =>
              import('./pages/dashboard/encounters/encounters').then((m) => m.Encounters),
          },
        ],
      },

      {
        path: 'lore',
        children: [
          { path: '', redirectTo: 'npcs', pathMatch: 'full' },
          {
            path: 'npcs',
            loadComponent: () => import('./pages/lore/npcs/npcs').then((m) => m.Npcs),
          },
          {
            path: 'beasts',
            loadComponent: () => import('./pages/lore/beasts/beasts').then((m) => m.Beasts),
          },
          {
            path: 'loot',
            loadComponent: () => import('./pages/lore/loot/loot').then((m) => m.Loot),
          },
        ],
      },
      // --- BRANCHE SETTINGS ---
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
      },
    ],
  },
];
