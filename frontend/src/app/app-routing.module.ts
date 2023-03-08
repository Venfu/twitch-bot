import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationsComponent } from './animations/animations.component';
import { EventMessageComponent } from './fragments/event-message/event-message.component';
import { LastFollowerComponent } from './fragments/last-follower/last-follower.component';

const routes: Routes = [
  {
    path: 'fragments',
    children: [
      { path: 'last-follower', component: LastFollowerComponent },
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
