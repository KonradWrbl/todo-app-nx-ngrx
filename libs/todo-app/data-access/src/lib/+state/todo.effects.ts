import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { TodoService } from '../todo.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TodoEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.init),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todo) => TodoActions.loadTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.loadTodoFailure({ error })))
        )
      )
    );
  });

  createTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.createTodo),
      mergeMap((action) =>
        this.todoService.createTodo(action.todo).pipe(
          map((todo) => TodoActions.createTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.createTodoFail({ error })))
        )
      )
    );
  });

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.removeTodo),
      mergeMap((action) =>
        this.todoService.removeTodo(action.id).pipe(
          map(() => TodoActions.removeTodoSuccess()),
          catchError((error) => of(TodoActions.removeTodoFail({ error })))
        )
      )
    )
  );

  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.editTodo),
      mergeMap((action) =>
        this.todoService.editTodo(action.todo).pipe(
          map(() => TodoActions.editTodoSuccess()),
          catchError((error) => of(TodoActions.editTodoFail({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private todoService: TodoService,
    private router: Router
  ) {}
}
