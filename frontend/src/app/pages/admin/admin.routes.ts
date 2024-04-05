import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin.component').then((m) => m.AdminComponent),
  },
];
