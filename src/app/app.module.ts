import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentlistComponent } from './component/studentlist/studentlist.component';
import { fakeBackendProvider } from './service/logindata.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './component/todo/todo.component';
import { TododetailComponent } from './component/tododetail/tododetail.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DocumentComponent } from './component/document/document.component';
import { DocumentListComponent } from './component/document-list/document-list.component';
import { DocumenthostComponent } from './component/documenthost/documenthost.component';
import { JwtModule } from '@auth0/angular-jwt';
import {
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';
import { DialogboxComponent } from './component/dialogbox/dialogbox.component';
import { NewtodoComponent } from './component/newtodo/newtodo.component';
import { DatePipe } from '@angular/common';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TododetailComponent,
    DashboardComponent,
    LoginComponent,
    DocumentComponent,
    DocumentListComponent,
    DocumenthostComponent,
    StudentlistComponent,
    DialogboxComponent,
    NewtodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    }),
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [
    fakeBackendProvider,
    DatePipe
  ],
  entryComponents: [
    DialogboxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
