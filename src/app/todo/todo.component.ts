import { Task } from './../model/task';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { MessageService } from '../service/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { ToDo } from '../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  selectedToDo: ToDo;
  todoList: ToDo[];
  descriptionError: string;

  todoForm = new FormGroup({
    descriptionField: new FormControl(''),
    deadlineField: new FormControl(''),
  });
  StudentData: any = [];

  ngOnInit() {
    this.getTodoList();
    //this.tryRest();
  }
  tryRest() {
    this.todoService.tryRest().subscribe(data => {
      this.StudentData = data;
      console.log(data);
    });
  }

  getTodoList(): void {
    this.todoService.getTodoList().subscribe(todolist => {
      this.todoList = todolist.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
    });
  }

  sortToDoListByLatest(): void {
    this.todoList = this.todoList.sort((a, b) => (a.deadline < b.deadline) ? 1 : -1);
  }
  sortToDoListByEarliest(): void {
    this.todoList = this.todoList.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
  }

  add(description: string, deadline: Date): void {
    description = description.trim();
    if (!description) {
      this.descriptionError = 'Description must not be empty';
      return;
    }
    if (!deadline) {
      this.descriptionError = 'Deadline must not be empty';
      return;
    } else if (new Date(deadline) < new Date()) {
      if (new Date(deadline).toDateString() !== new Date().toDateString()) {
        this.descriptionError = 'Deadline date must be today or later';
        return;
      }
    }
    this.todoService.addToDo({description, deadline} as ToDo)
      .subscribe(todo => {
        this.todoList.push(todo);
        this.todoList.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
        this.todoForm.setValue({
          descriptionField: '',
          deadlineField: ''
        });
      });
  }
  updateStatus(todo: ToDo): void {
    this.todoService.updateToDo(todo).subscribe();
  }
  delete(todo: ToDo): void {
    this.todoList = this.todoList.filter(t => t !== todo);
    this.todoService.deleteToDo(todo).subscribe();
  }

}
