import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionComponent } from './Components/mission/mission.component';

const routes: Routes = [
  { path: '', component: MissionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule { }
