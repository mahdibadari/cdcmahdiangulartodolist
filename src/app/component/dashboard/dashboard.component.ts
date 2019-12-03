import { Credential } from '../../model/credential';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  users: Credential;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    this.users = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = false;
  }

}
