import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceComponent } from './Components/presence/presence.component';

const routes: Routes = [
  { path: '', component: PresenceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresenceRoutingModule { }
