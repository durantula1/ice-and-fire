import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-characters-list-skeleton',
  imports: [CardModule, SkeletonModule],
  templateUrl: './characters-list-skeleton.html',
  styleUrl: './characters-list-skeleton.scss',
})
export class CharactersListSkeleton {}
