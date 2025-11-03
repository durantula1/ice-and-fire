import { Component, computed, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-character-info-field',
  imports: [TagModule],
  templateUrl: './character-info-field.html',
  styleUrl: './character-info-field.scss',
})
export class CharacterInfoField {
  title = input.required<string>();
  icon = input.required<string>();
  iconColor = input<string>('primary');
  value = input<string | string[]>();
  severity = input<
    'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'
  >('info');
  emptyText = input<string>('No data');

  displayText = computed(() => {
    const val = this.value();
    if (!val) return this.emptyText();

    if (Array.isArray(val)) {
      return val.length > 0
        ? `${val.length} ${val.length === 1 ? 'item' : 'items'}`
        : this.emptyText();
    }

    return val;
  });
}
