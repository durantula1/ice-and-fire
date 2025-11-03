import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-character-info-skeleton',
  imports: [SkeletonModule, CardModule],
  templateUrl: './character-info-skeleton.html',
  styleUrl: './character-info-skeleton.scss',
})
export class CharacterInfoSkeleton {}
