import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [],
  templateUrl: './character-page.html',
  styleUrl: './character-page.css',
})
export class CharacterPage {
  route: ActivatedRoute = inject(ActivatedRoute);
  id = Number(this.route.snapshot.paramMap.get('id'));
}
