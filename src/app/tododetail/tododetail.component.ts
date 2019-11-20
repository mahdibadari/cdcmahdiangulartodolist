import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToDo } from '../todo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tododetail',
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.css'],
  providers: [DatePipe]
})
export class TododetailComponent implements OnInit {
  todo: ToDo;
  descriptionError: string;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.getTodo();
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getToDo(id)
      .subscribe(todo => {
        this.todo = this.updateToDo(todo);
      });
  }

  updateToDo(todo: ToDo): ToDo {
    const newToDo = todo;
    newToDo.formattedDeadline = this.datepipe.transform(todo.deadline, 'yyyy-MM-dd');
    return newToDo;
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
    this.todoService.updateToDo(this.todo)
      .subscribe(() => this.goBack());
  }

}
