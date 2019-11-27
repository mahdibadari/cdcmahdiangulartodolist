import { StudentService } from './../service/student.service';
import { Student } from './../model/student';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  StudentData: any = [];

  constructor(private studentApi: StudentService) {
    this.studentApi.GetStudents().subscribe(data => {
      console.log(data);
      this.StudentData = data;
    });
   }

  ngOnInit() {
  }

}
