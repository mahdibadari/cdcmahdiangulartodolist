import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { fakeBackendProvider } from './service/logindata.service';
import { InMemoryDataService } from './service/in-memory-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TododetailComponent } from './tododetail/tododetail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DocumentComponent } from './document/document.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumenthostComponent } from './documenthost/documenthost.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TododetailComponent,
    DashboardComponent,
    LoginComponent,
    DocumentComponent,
    DocumentListComponent,
    DocumenthostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    /* HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ), */
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    /* { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}, */
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
