import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddUserComponent } from './Components/admin-add-user/admin-add-user.component';

const routes: Routes = [
  {path:'' , component:AdminAddUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
