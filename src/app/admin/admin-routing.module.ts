import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddUserComponent } from './Components/admin-add-user/admin-add-user.component';
import { AdminComponent } from './Components/admin/admin.component';

const routes: Routes = [
  {path:'' , component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
