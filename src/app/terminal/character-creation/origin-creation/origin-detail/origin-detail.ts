import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-origin-detail',
  imports: [],
  templateUrl: './origin-detail.html',
  styleUrls: ['./origin-detail.css', '../origin-creation.css'],
  standalone: true,
})
export class OriginDetail {
  @Input() title: string = '';
  @Input() items: string[] | undefined = [];
}
