import { Task } from '../../model/task';
import { TaskService } from '../../service/task.service';
import { TodoService } from '../../service/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ToDo } from '../../model/todo';
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
  prodId: string;
  descriptionError: string;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private datepipe: DatePipe,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.prodId = params['id'];
   });
    this.getTodo();
  }

  getTodo(): void {
    this.taskService.GetTask(this.prodId)
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
    this.task.deadline = new Date(this.task.formattedDeadline);
    if (!this.task.description) {
      this.descriptionError = 'Description must not be empty';
      return;
    }
    if (!this.task.deadline) {
      this.descriptionError = 'Deadline must not be empty';
      return;
    } else if (new Date(this.task.deadline) < new Date()) {
      if (new Date(this.task.deadline).toDateString() !== new Date().toDateString()) {
        this.descriptionError = 'Deadline date must be today or later';
        return;
      }
    }
    this.taskService.UpdateTask(this.prodId, this.task)
      .subscribe(() => this.goBack());
  }

}
