import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
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
import { MessageModule } from 'primeng/message';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
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
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private actions$ = inject(Actions);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);

  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  ngOnInit(): void {
    this.actions$
      .pipe(
        ofType(AuthActions.registerSuccess, AuthActions.registerFailure),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((action) => {
        this.loading.set(false);
        if (action.type === AuthActions.registerSuccess.type) {
          this.registerForm.reset();
        }
      });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading.set(true);
    const { email, password } = this.registerForm.getRawValue();
    this.store.dispatch(AuthActions.register({ email, password }));
  }

  passwordMatchValidator(g: FormGroup): ValidationErrors | null {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
