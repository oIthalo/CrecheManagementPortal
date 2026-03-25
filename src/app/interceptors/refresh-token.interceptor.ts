import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, interval, of, switchMap } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!authService.isRefreshLoopActive) {
    authService.isRefreshLoopActive = true;

    interval(6900000)
      .pipe(
        switchMap(() => {
          const tokens = authService.getTokens();
          if (!tokens)
            return of(null);

          return authService.refreshToken(tokens.refreshToken).pipe(
            catchError(() => {
              authService.logout();
              return of(null);
            })
          );
        })
      )
      .subscribe(res => {
        if (res?.data) {
          authService.saveTokens(res.data);
          console.log(res.data)
        }
      });
  }

  return next(req);
};
