export interface SubMenuItem {
  label: string; // Le texte affiché (ex: 'STATUS', 'ARMES', 'QUÊTES')
  path: string; // Le segment d'URL enfant (ex: 'status', 'weapons', 'quests')
}

export interface MainMenuItem {
  label: string; // Le texte du menu principal (ex: 'STATS', 'DONNÉES')
  path: string; // Le segment d'URL principal (ex: 'stats', 'data')
  subMenus: SubMenuItem[]; // La liste des sous-menus associés
}
