import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './Components/container/container.component';
import { AdminGuard } from './Services/admin.guard';
import { AuthGuard } from './Services/auth.guard';
import { UserService } from './Services/user.service';

const routes: Routes = [
  {
    
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
      },
      {
        path: 'presence',
        loadChildren: () => import('./presence/presence.module').then(m => m.PresenceModule)
      },
      {
        path: 'mission',
        loadChildren: () => import('./missions/missions.module').then(m => m.MissionsModule)
      },
      {
        path: 'vacation',
        loadChildren: () => import('./vacation/vacation.module').then(m => m.VacationModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canActivate:[AdminGuard]
      }
      
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule]
})
export class AppRoutingModule { }
