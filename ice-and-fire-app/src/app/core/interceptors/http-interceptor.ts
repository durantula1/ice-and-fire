import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastService } from '../services/toast.service';
import * as AuthActions from '../store/auth/auth.actions';

export function HttpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const store = inject(Store);
  const toastService = inject(ToastService);
  const headersConfig: any = {
    Accept: req.headers.get('Accept') || 'application/json',
  };

  const clonedRequest = req.clone({ setHeaders: headersConfig });
  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastService.showError('Unauthorized');
        store.dispatch(AuthActions.logout());
      }

      return throwError(() => error);
    })
  );
}
