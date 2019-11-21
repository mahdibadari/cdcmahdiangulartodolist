import { AuthService } from './../service/auth.service';
import { CredentialService } from './../service/credential.service';
import { Credential } from './../model/credential';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  users: Credential[];
  constructor(private credentialService: CredentialService) { }

  ngOnInit() {
    this.loading = true;
    this.credentialService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

}
