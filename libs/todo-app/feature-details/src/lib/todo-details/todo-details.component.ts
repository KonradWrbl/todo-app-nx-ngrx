import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import {
  editTodo,
  getTodoLoaded,
  init,
  removeTodo,
  selectTodoById,
  TodoEntity
} from '@todo-app/todo-app/data-access';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialogComponent } from '@todo-app/todo-app/feature-add-edit-todo';

interface DateDiffModel {
  days: number;
  hours: number;
  minutes: number;
}

@Component({
  selector: 'todo-app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  onDestroy: Subject<void> = new Subject();
  todo$: Observable<TodoEntity | undefined> = new Observable<
    TodoEntity | undefined
  >();
  dateDiff: Subject<DateDiffModel> = new Subject<DateDiffModel>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<TodoEntity>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(getTodoLoaded), take(1), takeUntil(this.onDestroy))
      .subscribe((loaded) => {
        !loaded && this.store.dispatch(init());
      });
    this.store.dispatch(init());
    this.todo$ = this.route.params.pipe(
      takeUntil(this.onDestroy),
      switchMap((res) =>
        this.store.pipe(
          select(selectTodoById(res.id)),
          takeUntil(this.onDestroy)
        )
      )
    );

    this.todo$.subscribe(
      (res) =>
        res &&
        this.dateDiff.next(
          this.getDateDifference(new Date(), new Date(res.deadline))
        )
    );
  }

  editTodo(todo: TodoEntity) {
    this.dialog.open(AddEditDialogComponent, {
      data: todo,
    });
  }

  deleteTodo(id: string | number) {
    this.store.dispatch(removeTodo({ id }));
    this.store
      .pipe(select(getTodoLoaded), takeUntil(this.onDestroy))
      .subscribe((res) => res && this.router.navigate(['/']));
  }

  switchTodoStatus(todo: TodoEntity) {
    this.store.dispatch(editTodo({ todo: { ...todo, done: !todo.done } }));
  }

  getDateDifference(startDate: Date, endDate: Date) {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    const minutes =
      Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
    return { days, hours, minutes };
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
