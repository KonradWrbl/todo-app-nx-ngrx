import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  createTodo,
  getAllTodo,
  init,
  removeTodo,
  TodoEntity,
} from '@todo-app/todo-app/data-access';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'todo-app-todos-wrapper',
  templateUrl: './todos-wrapper.component.html',
  styleUrls: ['./todos-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosWrapperComponent implements OnInit {
  todos$: Observable<TodoEntity[]> = new Observable<TodoEntity[]>();
  constructor(private store: Store<TodoEntity>) {}

  ngOnInit(): void {
    this.store.dispatch(init());
    this.todos$ = this.store.pipe(select(getAllTodo));
  }

  addTodo() {
    const id = Math.round(Math.random() * 1000);
    const date = new Date();
    const todo: TodoEntity = {
      _id: `${id}`,
      name: 'TODO ' + id,
      description: 'DESCRIPTION' + id,
      createdAt: date.toISOString(),
      deadline: new Date(date.setMonth(date.getMonth() + 1)).toISOString(),
    };
    this.store.dispatch(createTodo({ todo }));
  }

  deleteTodo(id: string | number) {
    this.store.dispatch(removeTodo({ id }));
  }
}
