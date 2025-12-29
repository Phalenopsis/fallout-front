import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterCreationService } from '../character-creation.service';

@Component({
  selector: 'app-draft-creation',
  imports: [],
  templateUrl: './draft-creation.html',
  styleUrl: './draft-creation.css',
})
export class DraftCreation implements OnInit {
  characterCreationService: CharacterCreationService = inject(CharacterCreationService);
  route: ActivatedRoute = inject(ActivatedRoute);
  id = Number(this.route.snapshot.paramMap.get('id'));
  router: Router = inject(Router);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.characterCreationService.loadCharacter(id).subscribe({
      next: (character) => {
        // Après avoir chargé le personnage, naviguer vers le step correct
        const step = this.characterCreationService.getCurrentStep();
        this.router.navigate([`/terminal/creation${step}`]);
      },
      error: (err) => {
        console.error('Impossible de charger le personnage', err);
        // rediriger vers création ou profil
        this.router.navigate(['/terminal/creation']);
      },
    });
  }
}
