import { AuthService } from './service/auth.service';
import { Credential } from './model/credential';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  currentUser: Credential;
  title = 'Todo List';

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
