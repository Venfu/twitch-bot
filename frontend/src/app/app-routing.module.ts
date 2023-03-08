import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastFollowerComponent } from './fragments/last-follower/last-follower.component';

const routes: Routes = [
  {
    path: 'fragments',
    children: [{ path: 'last-follower', component: LastFollowerComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
