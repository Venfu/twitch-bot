import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

export const authGuard: CanActivateFn = (route, state) => {
  const botIsConnected$ = inject(BackendService).botIsConnected();
  const router = inject(Router);
  return new Promise((res, rej) => {
    botIsConnected$.subscribe((data) => {
      if (data.connected) {
        res(true);
      } else {
        router.navigate(['/login']);
        res(false);
      }
    });
  });
};
