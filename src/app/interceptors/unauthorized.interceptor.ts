import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const ignoredRoutes = ['/login', '/register'];

  const isIgnored = ignoredRoutes.some(route =>
    req.url.includes(route)
  );

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isIgnored) {
        authService.logout();
      }

      return throwError(() => error);
    })
  );
};
