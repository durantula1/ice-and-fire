import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-message',
  imports: [],
  templateUrl: './status-message.html',
  styleUrl: './status-message.scss',
})
export class StatusMessage {
  title = input<string>('');
  description = input<string>('');
  icon = input<string>('pi pi-heart');
}
