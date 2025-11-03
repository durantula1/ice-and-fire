import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [ButtonModule, RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}
