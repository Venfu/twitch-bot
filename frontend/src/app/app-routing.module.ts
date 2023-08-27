import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationsComponent } from './animations/animations.component';
import { EventMessageComponent } from './fragments/event-message/event-message.component';
import { LastAnnounceComponent } from './fragments/last-announce/last-announce.component';
import { LastFollowerComponent } from './fragments/last-follower/last-follower.component';
import { LiveChatComponent } from './fragments/live-chat/live-chat.component';

const routes: Routes = [
  {
    path: 'fragments',
    children: [
      { path: 'last-follower', component: LastFollowerComponent },
      { path: 'last-announce', component: LastAnnounceComponent },
      { path: 'live-chat', component: LiveChatComponent },
      { path: 'message', component: EventMessageComponent },
    ],
  },
  { path: 'animations', component: AnimationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
