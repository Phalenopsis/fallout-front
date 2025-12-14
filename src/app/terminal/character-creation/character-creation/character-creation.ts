import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CharacterCreationService } from '../character-creation.service';

@Component({
  selector: 'app-character-creation',
  imports: [RouterOutlet,],
  templateUrl: './character-creation.html',
  styleUrl: './character-creation.css',
  standalone: true,
})
export class CharacterCreation implements OnInit {
  router: Router = inject(Router);
  characterCreationService: CharacterCreationService = inject(CharacterCreationService);

  ngOnInit() {
    const route: string = `/terminal/creation/${this.characterCreationService.getCurrentStep()}`;
    this.router.navigate([route]);
  }
}
