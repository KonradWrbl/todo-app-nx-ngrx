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
  readonly todosUrl: string = this.appConfig.apiUrl + '/todos';

  constructor(
    @Inject(APP_CONFIG) private appConfig: { apiUrl: string; prod: boolean },
    private http: HttpClient
  ) {}

  getTodos(): Observable<TodoEntity[]> {
    return this.http
      .get<TodoEntity[]>(this.todosUrl)
      .pipe(tap((res) => console.log(res)));
  }

  createTodo(todo: TodoEntity): Observable<TodoEntity[]> {
    const {_id, ...rest} = todo;
    return this.http
      .post<TodoEntity>(this.todosUrl, rest)
      .pipe(concatMap(() => this.getTodos()));
  }

  removeTodo(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.todosUrl}/${id}`);
  }
}
