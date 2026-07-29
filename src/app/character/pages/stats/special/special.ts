import { Component, inject, OnInit, signal } from '@angular/core';
import { SPECIAL_IMAGES } from '../../../../core/component/image/special.images';
import { SrcImage } from '../../../../core/models/src-image.model';
import { Image } from '../../../../core/component/image/image.component';
import { CharacterStoreService } from '../../../services/character-store.service';
import { SPECIAL_DATA, SpecialInfo } from '../../../../core/constants/special-data.constant';
import { SpecialKey } from '../../../models/special.type';

@Component({
  selector: 'app-special',
  standalone: true,
  imports: [Image],
  templateUrl: './special.html',
  styleUrl: './special.css',
})
export class Special implements OnInit {
  private characterStore = inject(CharacterStoreService);

  readonly specialData = SPECIAL_DATA;

  // Stat sélectionnée (par défaut FORCE)
  activeStat = signal<SpecialKey>('strength');

  // Récupère l'instance du personnage depuis le store
  get character() {
    return this.characterStore.character();
  }

  get activeInfo(): SpecialInfo | undefined {
    return this.specialData.find((s) => s.key === this.activeStat());
  }

  get activeImage(): SrcImage | null {
    const key = this.activeStat();
    return key ? SPECIAL_IMAGES[key] : null;
  }

  getStatValue(key: SpecialKey): number {
    return this.character?.special?.[key] ?? 0;
  }

  selectStat(key: SpecialKey) {
    this.activeStat.set(key);
  }

  ngOnInit() {
    // Si aucune stat n'est active, on sélectionne la première
    if (!this.activeStat()) {
      this.activeStat.set('strength');
    }
  }
}
