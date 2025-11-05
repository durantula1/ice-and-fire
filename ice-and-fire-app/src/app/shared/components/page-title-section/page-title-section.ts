import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-page-title-section',
  imports: [FormsModule, InputTextModule],
  templateUrl: './page-title-section.html',
  styleUrl: './page-title-section.scss',
})
export class PageTitleSection {
  title = input<string>('');
  description = input<string>('');
  searchTerm = model<string>('');
  showSearch = input<boolean>(false);
}
