import { Component, OnInit } from '@angular/core';
import {
  createTodo,
  getAllTodo,
  getSelected,
  getTodoLoaded,
  getTodoState,
  init,
  TodoEntity,
} from '@todo-app/todo-app/data-access';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'todo-app-todos-wrapper',
  templateUrl: './todos-wrapper.component.html',
  styleUrls: ['./todos-wrapper.component.scss'],
})
export class TodosWrapperComponent implements OnInit {
  todos$: Observable<TodoEntity[]> = new Observable<TodoEntity[]>();

  constructor(private store: Store<TodoEntity>) {}

  ngOnInit(): void {
    this.store.dispatch(init());
    this.todos$ = this.store.pipe(select(getAllTodo));
    console.log(this.todos$);
    this.todos$.subscribe((res) => console.log(res));
  }

  addTodo() {
    const id = Math.round(Math.random() * 1000);
    const todo: TodoEntity = {
      id,
      name: 'TODO ' + id,
    };
    this.store.dispatch(createTodo({ todo }));
  }

  deleteTodo(id: string | number) {
    // this.todos = [...this.todos].filter(todo => todo.id !== id)
  }
}
