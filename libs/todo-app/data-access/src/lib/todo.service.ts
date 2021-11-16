import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoEntity } from '../../../data-access/src/';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { APP_CONFIG } from '@todo-app/app-config';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: BehaviorSubject<TodoEntity[]> = new BehaviorSubject<TodoEntity[]>([
    {
      id: 0,
      name: 'Hello Task',
      description: 'This is hello task, try to create one of your own',
      createdAt: new Date(),
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  ]);

  constructor(@Inject(APP_CONFIG) private appConfig: any) {}

  getTodos(): Observable<TodoEntity[]> {
    console.log(this.appConfig.apiURl);
    //this.http.get(this.appConfig.apiUrl)
    return this.todos$;
  }

  createTodo(todo: TodoEntity): Observable<TodoEntity[]> {
    this.todos$.next([...this.todos$.getValue(), todo]);
    return this.todos$;
  }

  removeTodo(id: string | number): Observable<TodoEntity[]> {
    const filteredTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== id);
    this.todos$.next(filteredTodos);
    return this.todos$;
  }
}
