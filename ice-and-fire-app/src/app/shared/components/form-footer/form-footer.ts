import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-footer',
  imports: [RouterLink],
  templateUrl: './form-footer.html',
  styleUrl: './form-footer.scss',
})
export class FormFooter {
  linkRouterLink = input<string>('');
  linkText = input<string>('');
  text = input<string>('');
}
