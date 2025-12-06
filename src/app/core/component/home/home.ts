import { Component } from '@angular/core';
import { Banner } from "../banner/banner";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Banner, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
}
