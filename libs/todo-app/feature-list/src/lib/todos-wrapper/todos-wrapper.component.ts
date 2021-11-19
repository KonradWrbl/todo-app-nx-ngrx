import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  getAllTodo,
  getDone, getUndone,
  init,
  removeTodo,
  TodoEntity
} from '@todo-app/todo-app/data-access';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from '@todo-app/todo-app/feature-add-edit-todo';

@Component({
  selector: 'todo-app-todos-wrapper',
  templateUrl: './todos-wrapper.component.html',
  styleUrls: ['./todos-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosWrapperComponent {
  todos$: Observable<TodoEntity[]> = new Observable<TodoEntity[]>();
  //doneTodos$: Observable<TodoEntity[]>
  constructor(private store: Store<TodoEntity>, private dialog: MatDialog) {
    this.store.dispatch(init());
    this.todos$ = this.store.pipe(select(getAllTodo));
    this.store.pipe(select(getDone)).subscribe();
    this.store.pipe(select(getUndone)).subscribe();

  }

  addTodo() {
    this.dialog.open(AddEditDialogComponent);
  }

  editTodo(todo: TodoEntity) {
    this.dialog.open(AddEditDialogComponent, {
      data: todo,
    });
  }

  deleteTodo(id: string | number) {
    this.store.dispatch(removeTodo({ id }));
  }
}
