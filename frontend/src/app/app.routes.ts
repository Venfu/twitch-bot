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
      {
        path: 'message',
        loadComponent: () =>
          import('./fragments/message/message.component').then(
            (m) => m.MessageComponent
          ),
      },
      {
        path: 'last-announce',
        loadComponent: () =>
          import('./fragments/last-announce/last-announce.component').then(
            (m) => m.LastAnnounceComponent
          ),
      },
      {
        path: 'animation',
        loadComponent: () =>
          import('./fragments/animation/animation.component').then(
            (m) => m.AnimationComponent
          ),
      },
    ],
  },
];
