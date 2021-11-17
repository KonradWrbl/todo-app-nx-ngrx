import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoEntity } from '../../../data-access/src/';
import { HttpClient } from '@angular/common/http';
import { concatMap, } from 'rxjs/operators';
import { TodoAppCoreModule } from '@todo-app/todo-app/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly url: string = 'https://crudcrud.com/api/6977866838a340dcb513716d8f66169c'
  readonly todosUrl: string = this.url + '/todos';

  constructor(
    @Inject(TodoAppCoreModule) private appConfig: { apiUrl: string; prod: boolean },
    private http: HttpClient
  ) {}

  getTodos(): Observable<TodoEntity[]> {
    return this.http
      .get<TodoEntity[]>(this.todosUrl)}

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
