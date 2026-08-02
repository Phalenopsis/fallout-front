import { Routes } from '@angular/router';
import { CharacterShell } from './character-shell/character-shell';

export const CHARACTER_ROUTES: Routes = [
  {
    path: '',
    component: CharacterShell,
    children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },

      // --- BRANCHE STATS ---
      {
        path: 'stats',
        children: [
          { path: '', redirectTo: 'status', pathMatch: 'full' },
          {
            path: 'status',
            loadComponent: () => import('./pages/stats/status/status').then((m) => m.Status),
          },
          {
            path: 'special',
            loadComponent: () => import('./pages/stats/special/special').then((m) => m.Special),
          },
          {
            path: 'skills',
            loadComponent: () => import('./pages/stats/skills/skills').then((m) => m.Skills),
          },
          {
            path: 'perks',
            loadComponent: () => import('./pages/stats/perks/perks').then((m) => m.Perks),
          },
        ],
      },

      // --- BRANCHE DATA ---
      {
        path: 'data',
        children: [
          { path: '', redirectTo: 'quests', pathMatch: 'full' },
          {
            path: 'quests',
            loadComponent: () => import('./pages/data/quests/quests').then((m) => m.Quests),
          },
          {
            path: 'npcs',
            loadComponent: () => import('./pages/data/npcs/npcs').then((m) => m.Npcs),
          },
          {
            path: 'locations',
            loadComponent: () =>
              import('./pages/data/locations/locations').then((m) => m.Locations),
          },
          {
            path: 'reputation',
            loadComponent: () =>
              import('./pages/data/reputation/reputation').then((m) => m.Reputation),
          },
          {
            path: 'background',
            loadComponent: () =>
              import('./pages/data/background/background').then((m) => m.Background),
          },
          {
            path: 'notes',
            loadComponent: () => import('./pages/data/notes/notes').then((m) => m.Notes),
          },
        ],
      },

      // --- BRANCHE INVENTORY ---
      {
        path: 'inventory',
        children: [
          { path: '', redirectTo: 'weapons', pathMatch: 'full' },
          {
            path: 'weapons',
            loadComponent: () => import('./pages/inventory/weapons/weapons').then((m) => m.Weapons),
          },
          {
            path: 'armor',
            loadComponent: () => import('./pages/inventory/armor/armor').then((m) => m.Armor),
          },
          {
            path: 'misc',
            loadComponent: () => import('./pages/inventory/misc/misc').then((m) => m.Misc),
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
