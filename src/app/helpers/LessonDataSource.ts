import { TaskService } from './../service/task.service';
import { Task } from './../model/task';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class LessonsDataSource implements DataSource<Task> {

    private lessonsSubject = new BehaviorSubject<Task[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private coursesService: TaskService) {}

    connect(collectionViewer: CollectionViewer): Observable<Task[]> {
      return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.lessonsSubject.complete();
      this.loadingSubject.complete();
    }

    push(task: Task) {
      this.coursesService.AddTasks(task).subscribe();
      this.coursesService.GetTasks().pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(lessons => this.lessonsSubject.next(lessons));
    }

    update(id: string, task: Task) {
      this.coursesService.UpdateTask(id, task).subscribe();
      this.coursesService.GetTasks().pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(lessons => this.lessonsSubject.next(lessons));
    }

    delete(id: string) {
      this.coursesService.DeleteTask(id).subscribe();
      this.coursesService.GetTasks().pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(lessons => this.lessonsSubject.next(lessons));
    }

    loadTasks() {
                  this.loadingSubject.next(true);

                  this.coursesService.GetTasks().pipe(
                      catchError(() => of([])),
                      finalize(() => this.loadingSubject.next(false))
                  )
                  .subscribe(lessons => this.lessonsSubject.next(lessons));
    }
}
