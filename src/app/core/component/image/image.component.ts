import { Component, Input } from '@angular/core';
import { SrcImage } from '../../models/src-image.model';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css',
})
export class Image {
  @Input() image!: SrcImage;
}
