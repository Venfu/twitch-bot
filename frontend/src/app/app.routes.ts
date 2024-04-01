import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'fragments',
    children: [
      {
        path: 'live-chat',
        loadComponent: () =>
          import('./fragments/live-chat/live-chat.component').then(
            (m) => m.LiveChatComponent
          ),
      },
      {
        path: 'last-follower',
        loadComponent: () =>
          import('./fragments/last-follower/last-follower.component').then(
            (m) => m.LastFollowerComponent
          ),
      },
      // { path: 'last-announce', component: LastAnnounceComponent },
      // { path: 'message', component: EventMessageComponent },
    ],
  },
  // { path: 'animations', component: AnimationsComponent },
];
