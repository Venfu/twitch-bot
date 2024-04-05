import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/admin/admin.routes').then((m) => m.routes),
  },
  {
    path: 'fragments',
    loadChildren: () =>
      import('./fragments/fragments.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./pages/doc/doc.component').then((m) => m.DocComponent),
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
];
