import { Task } from '../../model/task';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../service/todo.service';
import { MessageService } from '../../service/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { ToDo } from '../../model/todo';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService, private taskService: TaskService) { }

  selectedToDo: ToDo;
  todoList: ToDo[];
  descriptionError: string;

  tasks: any = [];

  todoForm = new FormGroup({
    descriptionField: new FormControl(''),
    deadlineField: new FormControl(''),
  });
  StudentData: any = [];

  ngOnInit() {
    this.taskService.GetTasks().subscribe(data => {
      this.tasks = data;
      this.tasks = this.tasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
    });
  }

  getTodoList(): void {
    this.todoService.getTodoList().subscribe(todolist => {
      this.todoList = todolist.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
    });
  }

  sortToDoListByLatest(): void {
    this.tasks = this.tasks.sort((a, b) => (a.deadline < b.deadline) ? 1 : -1);
  }
  sortToDoListByEarliest(): void {
    this.tasks = this.tasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
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
    this.taskService.AddTasks({description, deadline} as Task)
      .subscribe(todo => {
        this.tasks.push(todo);
        this.tasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1);
        this.todoForm.setValue({
          descriptionField: '',
          deadlineField: ''
        });
      });
  }
  updateStatus(task: Task): void {
    this.taskService.UpdateTask(task._id, task).subscribe();
  }
  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.DeleteTask(task._id).subscribe();
  }

}
