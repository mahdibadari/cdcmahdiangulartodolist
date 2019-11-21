import { ToDoStatus } from '../model/todostatusenum';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ToDo } from '../model/todo';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const todolist = [
      { id: 1, description: 'First task', done: false, deadline: new Date('2019-12-01') },
      { id: 2, description: 'Second task', done: true, deadline: new Date('2019-12-02') },
      { id: 3, description: 'Third task', done: false, deadline: new Date('2019-11-30') }
    ];
    return {todolist};
  }

  genId(todolist: ToDo[]): number {
    return todolist.length > 0 ? Math.max(...todolist.map(todo => todo.id)) + 1 : 1;

  }
}
