import { LoginComponent } from './login/login.component';
import { TododetailComponent } from './tododetail/tododetail.component';
import { TodoComponent } from './todo/todo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'todolist', component: TodoComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tododetail/:id', component: TododetailComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
