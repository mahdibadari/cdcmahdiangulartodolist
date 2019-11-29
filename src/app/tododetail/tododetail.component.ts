import { Task } from './../model/task';
import { TaskService } from './../service/task.service';
import { TodoService } from '../service/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToDo } from '../model/todo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tododetail',
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.css'],
  providers: [DatePipe]
})
export class TododetailComponent implements OnInit {
  todo: ToDo;
  task: Task;
  descriptionError: string;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private datepipe: DatePipe,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getTodo();
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.GetTask(id)
      .subscribe(task => {
        this.task = this.upgradeTask(task);
      });
  }

  upgradeTask(task: Task): Task {
    const newTask = task;
    newTask.formattedDeadline = this.datepipe.transform(task.deadline, 'yyyy-MM-dd');
    return newTask;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.todo.deadline = new Date(this.todo.formattedDeadline);
    if (!this.todo.description) {
      this.descriptionError = 'Description must not be empty';
      return;
    }
    if (!this.todo.deadline) {
      this.descriptionError = 'Deadline must not be empty';
      return;
    } else if (new Date(this.todo.deadline) < new Date()) {
      if (new Date(this.todo.deadline).toDateString() !== new Date().toDateString()) {
        this.descriptionError = 'Deadline date must be today or later';
        return;
      }
    }
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.UpdateTask(id, this.task)
      .subscribe(() => this.goBack());
  }

}
