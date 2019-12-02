import { Task } from './../../model/task';
import { TaskService } from './../../service/task.service';
import { LessonsDataSource } from './../../helpers/LessonDataSource';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';

export interface UsersData {
  name: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence'},
  {id: 1560608796014, name: 'Machine Learning'},
  {id: 1560608787815, name: 'Robotic Process Automation'},
  {id: 1560608805101, name: 'Blockchain'}
];

@Component({
  selector: 'app-newtodo',
  templateUrl: './newtodo.component.html',
  styleUrls: ['./newtodo.component.css']
})
export class NewtodoComponent implements OnInit {
  displayedColumns: string[] = ['no', 'description', 'deadline', 'done', 'action'];
  dataSource: LessonsDataSource;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit() {
    this.dataSource = new LessonsDataSource(this.taskService);
    this.dataSource.loadTasks();
  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === "Add") {
        this.addRowData(result.data);
      } else if (result.event === "Update") {
        this.updateRowData(result.data);
      } else if (result.event === "Delete") {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    this.dataSource.push({
      description: row_obj.description,
      deadline: new Date(row_obj.formattedDeadline)
    } as Task);
    this.table.renderRows();
  }
  updateRowData(row_obj) {
    this.dataSource.update(row_obj._id, row_obj as Task);
    this.table.renderRows();
  }
  deleteRowData(row_obj) {
    this.dataSource.delete(row_obj._id);
    this.table.renderRows();
  }
}
