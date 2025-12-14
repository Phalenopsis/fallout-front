import { Component, inject, OnInit } from '@angular/core';
import { Banner } from "../banner/banner";
import { Router, RouterOutlet } from '@angular/router';
import { AuthApiService } from '../../../service/api/auth-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Banner, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
