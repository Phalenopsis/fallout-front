import { Routes } from '@angular/router';
import { CampaignShell } from './campaign-shell/campaign-shell';
import { NotesContainer } from '../note/component/notes-container/notes-container';
import { NoteType } from '../note/models/note-type.enum';

export const CAMPAIGN_ROUTES: Routes = [
  {
    path: '',
    component: CampaignShell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'tools',
        children: [
          {
            path: '',
            redirectTo: 'name-generator',
            pathMatch: 'full',
          },
          {
            path: 'name-generator',
            loadComponent: () =>
              import('./pages/tools/name-generator/name-generator').then((m) => m.NameGenerator),
          },
        ],
      },
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
      // --- BRANCHE DATA ---
      {
        path: 'data',
        children: [
          { path: '', redirectTo: 'quests', pathMatch: 'full' },
          {
            path: 'quests',
            component: NotesContainer,
            data: { noteType: NoteType.QUEST },
          },
          {
            path: 'locations',
            component: NotesContainer,
            data: { noteType: NoteType.LOCATION },
          },
          { path: 'npcs', component: NotesContainer, data: { noteType: NoteType.NPC } },
          {
            path: 'background',
            component: NotesContainer,
            data: { noteType: NoteType.BACKGROUND },
          },
          {
            path: 'notes',
            component: NotesContainer,
            data: { noteType: NoteType.FREE_NOTE },
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
