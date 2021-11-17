import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoEntity } from '../../../data-access/src/';
import { HttpClient } from '@angular/common/http';
import { concatMap, } from 'rxjs/operators';
import { APP_CONFIG } from '@todo-app/todo-app/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly url: string = 'https://crudcrud.com/api/6977866838a340dcb513716d8f66169c'
  readonly todosUrl: string = this.appConfig.apiUrl + '/todos';

  constructor(
    @Inject(APP_CONFIG) private appConfig: { apiUrl: string; prod: boolean },
    private http: HttpClient
  ) {}

  getTodos(): Observable<TodoEntity[]> {
    console.log(this.appConfig)
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

  getTodoById(id: string | number) {
    return this.http.get<TodoEntity>(`${this.todosUrl}/${id}`)
  }
}
