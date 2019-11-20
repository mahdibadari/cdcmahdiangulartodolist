import { ToDo } from './todo';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  private todolistUrl = 'api/todolist';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTodoList(): Observable<ToDo[]> {
    this.messageService.add('TodoService: fetched todo list');
    return this.http.get<ToDo[]>(this.todolistUrl)
      .pipe(
        tap(_ => this.log('fetched todo list')),
        catchError(this.handleError<ToDo[]>('getTodoList', []))
      );
  }
  getToDo(id: number): Observable<ToDo> {
    this.messageService.add('TodoService: fetched todo');
    const url = `${this.todolistUrl}/${id}`;
    return this.http.get<ToDo>(url).pipe(
      tap(_ => this.log('fetched todo id=${id}')),
      catchError(this.handleError<ToDo>('getToDo id=${id}')),
    );
  }

  addToDo(todo: ToDo): Observable<ToDo> {
    this.messageService.add('TodoService: added todo');
    return this.http.post<ToDo>(this.todolistUrl, todo, this.httpOptions).pipe(
      tap((newTodo: ToDo) => this.log(`added todo w/ id=${newTodo.id}`)),
      catchError(this.handleError<ToDo>('addToDo'))
    );
  }

  updateToDo(todo: ToDo): Observable<any> {
    this.messageService.add('TodoService: update todo');
    return this.http.put(this.todolistUrl, todo, this.httpOptions).pipe(
      tap(_ => this.log('updated todo id=${todo.id}')),
      catchError(this.handleError<any>('update todo'))
    );
  }

  deleteToDo(todo: ToDo | number): Observable<ToDo> {
    this.messageService.add('TodoService: delete todo');
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todolistUrl}/${id}`;

    return this.http.delete<ToDo>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<ToDo>('deleteToDo'))
    );
  }

  private log(message: string) {
    this.messageService.add('TodoService: ${message}');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log('${operation} failed: ${error.message}');
      return of(result);
    };
  }
}
