import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HumanNameGenerator } from './human-name-generator';
import { SuperMutantNameGenerator } from './super-mutant-name-generator';

@Component({
  selector: 'app-name-generator',
  standalone: true,
  imports: [CommonModule, HumanNameGenerator, SuperMutantNameGenerator],
  templateUrl: './name-generator.html',
  styleUrl: './../../../../core/component/pipboy-layout/pipboy-page.css',
})
export class NameGenerator {}
