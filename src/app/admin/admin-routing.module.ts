import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { ChildInfoComponent } from './Components/child-info/child-info.component';

const routes: Routes = [
  {path:'' , component:AdminComponent },
  {path:'userInfo/:id' , component:ChildInfoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
