import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../../core/store/auth/auth.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageModule } from 'primeng/message';
import { FormHeader } from '../../../shared/components/form-header/form-header';
import { FormFooter } from '../../../shared/components/form-footer/form-footer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    DividerModule,
    CommonModule,
    MessageModule,
    FormHeader,
    FormFooter,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private actions$ = inject(Actions);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    this.actions$
      .pipe(
        ofType(AuthActions.loginSuccess, AuthActions.loginFailure),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((action) => {
        this.loading.set(false);
        if (action.type === AuthActions.loginSuccess.type) {
          this.loginForm.reset();
        }
      });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading.set(true);
    this.store.dispatch(
      AuthActions.login({
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      })
    );
  }
}
