import { Injectable } from '@angular/core';
import { TodoEntity } from '@todo-app/todo-app/data-access';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: BehaviorSubject<TodoEntity[]> = new BehaviorSubject<TodoEntity[]>([
    { id: 0, name: 'hello' },
    { id: 1, name: 'oooo' },
  ]);

  constructor() {}

  getTodos(): Observable<TodoEntity[]> {
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
