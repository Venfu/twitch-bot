import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./fragments.component').then((m) => m.FragmentsComponent),
    children: [
      {
        path: 'live-chat',
        loadComponent: () =>
          import('./live-chat/live-chat.component').then(
            (m) => m.LiveChatComponent
          ),
      },
      {
        path: 'last-follower',
        loadComponent: () =>
          import('./last-follower/last-follower.component').then(
            (m) => m.LastFollowerComponent
          ),
      },
      {
        path: 'message',
        loadComponent: () =>
          import('./message/message.component').then((m) => m.MessageComponent),
      },
      {
        path: 'last-announce',
        loadComponent: () =>
          import('./last-announce/last-announce.component').then(
            (m) => m.LastAnnounceComponent
          ),
      },
      {
        path: 'animation',
        loadComponent: () =>
          import('./animation/animation.component').then(
            (m) => m.AnimationComponent
          ),
      },
    ],
  },
];
