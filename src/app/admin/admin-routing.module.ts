import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildInfo } from '../Models/login';
import { AdminComponent } from './Components/admin/admin.component';

const routes: Routes = [
  {path:'' , component:AdminComponent},
  {path:'userId' , component:ChildInfo}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
