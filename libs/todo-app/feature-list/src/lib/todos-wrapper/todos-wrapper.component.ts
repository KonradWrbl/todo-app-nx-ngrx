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
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from '../../../../feature-add-edit-todo/src/lib/add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'todo-app-todos-wrapper',
  templateUrl: './todos-wrapper.component.html',
  styleUrls: ['./todos-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosWrapperComponent implements OnInit {
  todos$: Observable<TodoEntity[]> = new Observable<TodoEntity[]>();
  constructor(private store: Store<TodoEntity>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(init());
    this.todos$ = this.store.pipe(select(getAllTodo));
  }

  addTodo(): void {
    this.dialog.open(AddEditDialogComponent);
  }

  editTodo(todo: TodoEntity): void {
    this.dialog.open(AddEditDialogComponent, {
      data: todo,
    });
  }

  deleteTodo(id: string | number): void {
    this.store.dispatch(removeTodo({ id }));
  }
}
