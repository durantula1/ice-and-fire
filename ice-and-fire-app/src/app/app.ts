import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Header } from './layout/header/header';
import { ToastModule } from 'primeng/toast';
import * as AuthActions from './core/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'ice-and-fire-app';
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadUserFromStorage());
  }
}
