import { Component, inject, OnInit } from '@angular/core';
import { Banner } from '../banner/banner';
import { Router, RouterOutlet } from '@angular/router';
import { AuthApiService } from '../../../service/api/auth-api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Banner, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  ngOnInit(): void {}
}
