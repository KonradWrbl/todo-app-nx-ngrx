import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TodoEntity } from '../../../data-access/src/';
import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { APP_CONFIG } from '@todo-app/app-config';
import { concatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // todos$: BehaviorSubject<TodoEntity[]> = new BehaviorSubject<TodoEntity[]>([
  //   {
  //     name: 'Hello Task',
  //     description: 'This is hello task, try to create one of your own',
  //     createdAt: new Date(),
  //     deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  //   },
  // ]);

  todosUrl: string = this.appConfig.apiUrl + '/todos';

  constructor(
    @Inject(APP_CONFIG) private appConfig: { apiUrl: string; prod: boolean },
    private http: HttpClient
  ) {}

  getTodos(): Observable<TodoEntity[]> {
    return this.http.get<TodoEntity[]>(this.todosUrl).pipe(tap(res => console.log(res)));
  }

  createTodo(todo: TodoEntity): Observable<TodoEntity[]> {
    return this.http.post<TodoEntity>(this.todosUrl, todo).pipe(concatMap(() => this.getTodos()))
  }

  removeTodo(id: string | number): Observable<any> {
    return this.http.delete(`${this.todosUrl}/${id}`)
  }
}
