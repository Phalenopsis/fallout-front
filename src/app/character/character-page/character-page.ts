import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterApiService } from '../../service/api/character-api.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './character-page.html',
  styleUrl: './character-page.css',
})
export class CharacterPage {
  route: ActivatedRoute = inject(ActivatedRoute);
  id = Number(this.route.snapshot.paramMap.get('id'));
  characterApiService: CharacterApiService = inject(CharacterApiService);

  character = this.characterApiService.getCharacter(this.id);
}
