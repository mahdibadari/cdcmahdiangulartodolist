import { StudentlistComponent } from './studentlist/studentlist.component';
import { DocumenthostComponent } from './documenthost/documenthost.component';
import { AuthGuard } from './helpers/AuthGuard';
import { LoginComponent } from './login/login.component';
import { TododetailComponent } from './tododetail/tododetail.component';
import { TodoComponent } from './todo/todo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'todolist', component: TodoComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'tododetail/:id', component: TododetailComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'documenthost', component: DocumenthostComponent},
  {path: 'students', component: StudentlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
