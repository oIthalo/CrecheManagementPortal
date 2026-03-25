import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const url = state.url.toLowerCase();

  if (isLoggedIn && (url.includes('/login') || url.includes('/register'))) {
    router.navigate(['/creches']);
    return false;
  }

  if (!isLoggedIn && !(url.includes('/login') || url.includes('/register'))) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
